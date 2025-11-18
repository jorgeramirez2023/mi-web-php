<?php

    $debugText = false;

    function invokeURL(string $url, array $header, string $type, array $params, bool $decodeJSON = true)
    {

        try {
            // Validate the URL
            if (!filter_var($url, FILTER_VALIDATE_URL)) {
                return ['invoke_success' => false,'invoke_data' => [],'invoke_error' => 'Invalid URL'];
            }
                
            // Add query parameters
            if ($type === "GET") {           

                // Get the URL parts
                $baseURL = strtok($url, '?');
                $parURL = parse_url($url, PHP_URL_QUERY);
    
                // Add query parameters to PARAMS
                if ($parURL !== null) {
                    $existingURLParams = [];
                    parse_str($parURL, $existingURLParams);
                    $params = array_merge($existingURLParams, $params);
                }                            

                // Rebuild the URL
                $url = $baseURL;
                if (!empty($params)) {
                    $url .= '?' . http_build_query($params);
                }
                
            }
            else {
                // For POST, PUT, DELETE
                // Leave the $url as it comes in
            }
        
            // Initialize cURL
            $ch = curl_init($url);
            curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
            curl_setopt($ch, CURLOPT_HTTPHEADER, $header);
            curl_setopt($ch, CURLOPT_TIMEOUT, 30);
        
            // Configure request type
            if ($type === "POST") {
                curl_setopt($ch, CURLOPT_POST, true);
                curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($params));
            } elseif (in_array($type, ["PUT", "PATCH", "DELETE"])) {
                curl_setopt($ch, CURLOPT_CUSTOMREQUEST, $type);
                curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($params));
            } elseif ($type !== "GET") {
                return ['invoke_success' => false, 'invoke_data' => [], 'invoke_error' => "Unsupported HTTP method: $type"];
            }
        
            curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false); #if debug
            curl_setopt($ch, CURLOPT_SSL_VERIFYHOST, false); #if debug
            
            // Execute the request
            $result = curl_exec($ch);        
        
            // Error handling
            $error = null;
            $curlError = curl_error($ch); #Returns a string containing the last error message from curl_exec        
            if ($curlError) {            
                $curlInfo = curl_getinfo($ch); #Returns an array of information about the current request
                $error = $curlError . " (HTTP Code {$curlInfo['http_code']})";
            }

            // Close cURL
            curl_close($ch);
        
            // Decoding JSON
            $data = [];
            if ($error === null) {            
                if ($decodeJSON) {                
                    $data = json_decode($result, true);

                    if (json_last_error() !== JSON_ERROR_NONE) {
                        $error = 'JSON Decoding Error';
                    }                           
                }
                else {
                    $data = [$result]; #Access like data[0]                   
                }
            }

            // Return
            return ['invoke_success' => $error === null, 'invoke_data' => $data, 'invoke_error' => $error];
        } catch (Exception $e) {
            return ['invoke_success' => false, 'invoke_data' => [], 'invoke_error' => $e->getMessage()];
        }

    }
    

    function logIt($file_name, $msg) {
      global $debugText;
  
      $log_dir = "/tmp/";
  
      if (!is_dir($log_dir)) {
          if (!mkdir($log_dir, 0755, true)) {
              error_log("Failed to create directory: $log_dir");
              return;  // Stop if directory creation fails
          }
      }
  
      $file_name = basename($file_name ?: "debug.log");
      $file_path = $log_dir . $file_name;
  
      $text = date("Y-m-d H:i:s") . " | " . basename($_SERVER["REQUEST_URI"] ?? "unknown_request", ".php") . " | " . $msg;
  
      if ($file = fopen($file_path, 'a')) {
          fwrite($file, $text . PHP_EOL);
          fclose($file);
      } else {
          return;
      }
  
      if (isset($debugText) && $debugText == true) {
          print_r("<br>" . $msg);
      }
    }
  
    function sendEmail(string $to, string $subject, string $message) {
        $curl = curl_init();
    
        // URL encoding to avoid breaking query parameters
        $encodedTo = urlencode($to);
        $encodedSubject = urlencode($subject);
        $encodedMessage = urlencode($message);
    
        curl_setopt_array($curl, array(
            CURLOPT_URL => "https://www.zohoapis.com/creator/custom/proyectus123/sendEmail_KF?eTo={$encodedTo}&eSubject={$encodedSubject}&eMessage={$encodedMessage}&publickey=aRgCk4H3rYg8ZGxW316F8T61X",
            CURLOPT_RETURNTRANSFER => true,
            CURLOPT_FOLLOWLOCATION => true,
            CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
            CURLOPT_CUSTOMREQUEST => 'GET',
            CURLOPT_HTTPHEADER => array(
                'Content-Type: application/json'
            ),
            CURLOPT_SSL_VERIFYPEER => false,
            CURLOPT_SSL_VERIFYHOST => false,
        ));
        
        $response = curl_exec($curl);
        $httpCode = curl_getinfo($curl, CURLINFO_HTTP_CODE);
        $curlError = curl_error($curl);
        curl_close($curl);
        
        if ($response === false) {
            return ['success' => false, 'data' => [], 'error' => $curlError];        
        } else {
            return [
                'success' => true,
                'data' => json_decode($response, true), // Convert to associative array
                'httpCode' => $httpCode, 
                'error' => ""
            ];
        }  
    }    
    

    //logIt('', 'Included general.php');
    header('Content-Type: application/json');
    header("Access-Control-Allow-Origin: *");
        