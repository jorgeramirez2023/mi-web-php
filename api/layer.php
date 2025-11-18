<?php
include_once 'general_layer.php';

if (!isset($_GET["process"])) {
    $json = json_encode(["sucess" => false, "validation_msg" => "'process' parameter was not provided"]);
    echo $json;        
    exit();
}
$process = $_GET["process"];
////////////////////////////////////////////////
// Call
//
///////////////////////////////////////////////
$zc_url = "https://www.zohoapis.com/creator/custom/proyectus123";
if ($process == "b2b_calc_shippingFee") {
    /**************** PORTAL : SHIPPING FEE****************/
    if (!isset($_GET["b2b_order_id"])) {
        $json = json_encode(["success" => false, "validation_msg" => "'b2b_order_id' parameter was not provided"]);
        echo $json;        
        exit();
    }
    $b2b_soID = $_GET["b2b_order_id"];    
    //
    if (!isset($_GET["mode"])) {
        $json = json_encode(["success" => false, "validation_msg" => "'mode' parameter was not provided"]);
        echo $json;        
        exit();
    }
    $mode = $_GET["mode"];    
    //
    $request_url=$zc_url . "/b2b_calc_shippingFee?publickey=PXeQ6vfA6ef1NZJFb50O143zD&b2b_order_id=" . $b2b_soID . "&mode=" . $mode;
    $response = invokeURL($request_url, [], "GET",  []);
}
else if ($process == "b2b_validate_rushItem") {
    /**************** PORTAL: RUSH ITEMS ****************/
    if (!isset($_GET["b2b_order_id"])) {
        $json = json_encode(["success" => false, "validation_msg" => "'b2b_order_id' parameter was not provided"]);
        echo $json;        
        exit();
    }
    $b2b_order_id = $_GET["b2b_order_id"];    
    //
    if (!isset($_GET["in_store"])) {
        $json = json_encode(["success" => false, "validation_msg" => "'in_store' parameter was not provided"]);
        echo $json;        
        exit();
    }
    $in_store = $_GET["in_store"];    
    //
    $request_url = $zc_url . "/b2b_validate_rushItem?publickey=5GgFyRzKO2h3fbPVY0WYURa8E&b2b_order_id=" . $b2b_order_id . "&in_store=" . $in_store;
    $response = invokeURL($request_url, [], "GET",  []);
}
else if ($process == "b2b_get_cin7_orders_links") {
    /**************** ADMIN: CIN7 ORDERS LINKS ****************/
    if (!isset($_GET["b2b_order_id"])) {
        $json = json_encode(["success" => false, "validation_msg" => "'b2b_order_id' parameter was not provided"]);
        echo $json;        
        exit();
    }
    $b2b_order_id = $_GET["b2b_order_id"];    
    //
    $request_url = $zc_url . "/b2b_get_cin7_orders_links?publickey=NdwbSksMVNGwCDj4May84D7zV&b2b_order_id=" . $b2b_order_id;
    $response = invokeURL($request_url, [], "GET",  []);
}
else if ($process == "cin7_getSuppliersForB2B") {
    $request_url = $zc_url . "/cin7_getSuppliersForB2B?publickey=a9RTnvpQabXbjMeSyDeausvhV";
    $response = invokeURL($request_url, [], "GET",  []);
}
else if ($process == "sync_product") {
    if (!isset($_GET["op_pro_id"])) {
        $json = json_encode(["success" => false, "validation_msg" => "'op_pro_id' parameter was not provided"]);
        echo $json;        
        exit();
    }
    if (!isset($_GET["op_pro_variant_code"])) {
        $json = json_encode(["success" => false, "validation_msg" => "'op_pro_variant_code' parameter was not provided"]);
        echo $json;        
        exit();
    }
    //
    $op_pro_id = $_GET["op_pro_id"];
    $op_pro_variant_code = $_GET["op_pro_variant_code"];
    //
    $request_url = $zc_url . "/sync_product?publickey=n4uvny5MsTmrrPQ4PUDdkdRKR?op_pro_id=" . $op_pro_id . "&op_pro_variant_code=" . $op_pro_variant_code;
    $response = invokeURL($request_url, [], "GET",  []);
}
else if ($process == "b2b_ctrl_m_options") {
    if (!isset($_GET["group"])) {
        $json = json_encode(["success" => false, "validation_msg" => "'group' parameter was not provided"]);
        echo $json;        
        exit();
    }
    //
    $group = $_GET["group"];
    //
    $request_url = $zc_url . "/b2b_ctrl_m_options?publickey=dXezYBYd4awOtwTNPrTFAbusy?group=" . $group;
    $response = invokeURL($request_url, [], "GET",  []);    
}
else if ($process == "b2b_ctrl_b_prices") {
    $request_url = $zc_url . "/b2b_ctrl_b_prices?publickey=abZ4ben0FENg71vPn7P1jWx0b";
    $response = invokeURL($request_url, [], "GET",  []);        
}
else if ($process == "b2b_ctrl_b_ProByCat") {
    if (!isset($_GET["category_id_eq"])) {
        $json = json_encode(["success" => false, "validation_msg" => "'category_id_eq' parameter was not provided"]);
        echo $json;        
        exit();
    }
    //
    $category_id_eq = $_GET["category_id_eq"];
    //
    $request_url = $zc_url . "/b2b_ctrl_b_ProByCat?publickey=PDYy2Zk2G6nqOhdqEVwr173Qu?category_id_eq=" . $category_id_eq;
    $response = invokeURL($request_url, [], "GET",  []);        
}

////////////////////////////////////////////////
// Return
//
///////////////////////////////////////////////
if ($response['invoke_success'] == false) {
    // INVOKE error
    $json = json_encode(['success' => false, 'request' => $request_url, 'response' => json_encode($response)]);
}
else if ($response['invoke_data']['code'] != 3000) {
    // ZC CUSTOM API error
    $json = json_encode(['success' => false, 'api_error' => json_encode($response['invoke_data'])]);
}
else {
    //It returns what the Zoho Creator function returns:  {"success":true,"field1":{...}}
    if (!array_key_exists('success', $response['invoke_data']['result'])) {
        $response['invoke_data']['result']['success'] = true;
    }    
    $json = json_encode($response['invoke_data']['result']);
}
echo $json;
