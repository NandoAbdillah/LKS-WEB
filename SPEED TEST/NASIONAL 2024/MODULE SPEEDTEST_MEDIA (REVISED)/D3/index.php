<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Tic Tac Toe PHP</title>
    <style>
        html, body {
            width: 100%;
            height: 100%;
            display: flex;
            justify-content: center;
            align-items: center;
        }

        table {
            border-collapse: collapse;
        }

        td {
            width: 60px;
            height: 60px;
            border: 1px solid rgba(0, 0, 0, 0.3);
            text-align:center;
            font-weight:bold;
            font-size:40px;
        }
        .green{
            background:green;
            padding:10px;
            color:#FFF;
            margin-bottom:10px;
        }
        button{
            padding:5px;
            margin:5px 0;
            width: 100%;
        }
    </style>
</head>
<body>

<div class="container">
    <!--the prompt will be hidden at initial status-->
    <div class="green"><b>X Win!</b></div>
    
    <table>
        <tbody>
        <tr>
            <td>X</td>
            <td>X</td>
            <td>X</td>
        </tr>
        <tr>
            <td>O</td>
            <td>O</td>
            <td></td>
        </tr>
        <tr>
            <td></td>
            <td>O</td>
            <td></td>
        </tr>
        </tbody>
    </table>
    <button class="button">Reset</button>
</div>

</body>
</html>