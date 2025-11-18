<?php
  // api/users.php
  header("Content-Type: application/json");
  $data = [
    'id' => 1,
    'name' => 'Usuario de API',
    'timestamp' => time()
  ];
  echo json_encode($data);
?>