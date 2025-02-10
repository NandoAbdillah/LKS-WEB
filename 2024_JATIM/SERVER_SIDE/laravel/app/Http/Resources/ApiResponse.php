<?php

namespace App\Http\Resources;



class ApiResponse
{
    public static function success($status , $message = 'Success', $statusCode)
    {
        return response()->json([
            'status' => $status,
            'message' => $message,
        ], $statusCode);
    }

    public static function error($status, $statusCode = 400, $errors = null)
    {
        return response()->json([
            'status' => false,
            'message' => $status,
            'errors' => $errors,
        ], $statusCode);
    }
}
