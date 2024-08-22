@php
  $component = Route::currentRouteName();
@endphp


<!DOCTYPE html>
<html lang="es">

<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <title>Net Coaching</title>

  <link href="/lte/assets/css/icons.min.css" rel="stylesheet" type="text/css" />
  <link href='https://fonts.googleapis.com/css?family=Poppins' rel='stylesheet'>
  <link href="https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css" rel="stylesheet">

  <style>
    * {
      font-family: Poppins;
    }
  </style>

  @vite(['resources/css/app.css', 'resources/css/app.js', 'resources/js/' . Route::currentRouteName()])
  @inertiaHead
</head>

<body>
  @inertia

  <script src="https://cdn.jsdelivr.net/npm/flowbite@2.4.1/dist/flowbite.min.js"></script>
</body>

</html>
