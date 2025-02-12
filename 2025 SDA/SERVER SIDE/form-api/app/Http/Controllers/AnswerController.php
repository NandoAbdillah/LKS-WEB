<?php

namespace App\Http\Controllers;

use App\Models\Answer;
use App\Http\Requests\StoreAnswerRequest;
use App\Http\Requests\UpdateAnswerRequest;
use App\Models\Form;
use Illuminate\Http\Client\Request;
use Illuminate\Support\Facades\Auth;

class AnswerController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \App\Http\Requests\StoreAnswerRequest  $request
     * @return \Illuminate\Http\Response
     */
    public function submitResponse(Request $request, $formSlug)
    {
        $form = Form::where('slug', $formSlug)->first();

        // Jika form tidak ditemukan
        abort_if(!$form, 404, 'Form not found');

        $user = Auth::user();

        // Jika token tidak valid
        abort_if(!$user, 401, 'Unauthenticated.');

        // Jika email domain tidak diizinkan
        $allowedDomains = ['example.com', 'another.com']; // Ganti dengan daftar domain yang diperbolehkan
        $userDomain = substr(strrchr($user->email, "@"), 1);
        abort_if(!in_array($userDomain, $allowedDomains), 403, 'Forbidden access');

        // Jika form hanya mengizinkan 1 response per user dan user sudah submit sebelumnya
        $hasSubmitted = Answer::where('form_id', $form->id)
            ->where('user_id', $user->id)
            ->exists();
        abort_if($form->limit_one_response && $hasSubmitted, 422, 'You can not submit form twice');

        // Validasi input
        $validated = $request->validate([
            'answers' => 'required|array',
            'answers.*.question_id' => 'required|exists:questions,id',
            'answers.*.value' => 'nullable|string|max:255',
        ]);

        // Simpan jawaban
        foreach ($validated['answers'] as $answer) {
            Answer::create([
                'form_id' => $form->id,
                'question_id' => $answer['question_id'],
                'user_id' => $user->id,
                'value' => $answer['value'] ?? null,
            ]);
        }

        return response()->json([
            'message' => 'Submit response success'
        ], 200);
    }

    public function getAllResponses($formSlug)
    {
        $form = Form::where('slug', $formSlug)->first();

        if (!$form) {
            return response()->json([
                'message' => 'Form not found'
            ], 404);
        }

        if ($form->creator_id !== Auth::id()) {
            return response()->json([
                'message' => 'Forbidden access'
            ], 403);
        }

        $responses = Answer::where('form_id', $form->id)->with(['user:id,name,email,email_verified_at', 'answers'])->get();

        return response()->json([
            'message' => 'Get responses success',
            'responses' => $responses
        ], 200);
    }




    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Answer  $answer
     * @return \Illuminate\Http\Response
     */
    public function show(Answer $answer)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\Answer  $answer
     * @return \Illuminate\Http\Response
     */
    public function edit(Answer $answer)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \App\Http\Requests\UpdateAnswerRequest  $request
     * @param  \App\Models\Answer  $answer
     * @return \Illuminate\Http\Response
     */
    public function update(UpdateAnswerRequest $request, Answer $answer)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Answer  $answer
     * @return \Illuminate\Http\Response
     */
    public function destroy(Answer $answer)
    {
        //
    }
}
