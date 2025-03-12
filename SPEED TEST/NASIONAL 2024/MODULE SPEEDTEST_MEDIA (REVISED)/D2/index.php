<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Simple Noticeboard</title>
    <style type="text/css">
        .box{
            border-radius:16px;
            padding:20px;
            border:solid 1px rgba(0,0,0,0.2);
            margin-bottom: 10px;
        }
        .date{
            display:block;
            color:rgba(0,0,0,0.6);
            margin-bottom: 10px;
        }
        h3{
            margin:0;
        }
    </style>
</head>
<body>
    <h1>Noticeboard</h1>
    <input type="text" placeholder="Name"><br>
    <textarea placeholder="Content"></textarea><br>
    <button>Save</button>
    <hr>
    <div class="box">
        <h3>Go to school</h3>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Incidunt, obcaecati.
        <span class="date">21/08/2024</span>
        <button>Update</button>
        <button>Delete</button>
    </div>
    <div class="box">
        <h3>Go to garden</h3>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Incidunt, obcaecati.
        <span class="date">21/08/2024</span>
        <button>Update</button>
        <button>Delete</button>
    </div>
    <div class="box">
        <h3>Go to bed</h3>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Incidunt, obcaecati.
        <span class="date">21/08/2024</span>
        <button>Update</button>
        <button>Delete</button>
    </div>
</body>
</html>