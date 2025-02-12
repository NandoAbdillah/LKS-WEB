<?php

namespace App\Http\Controllers;

use App\Models\Question;
use App\Http\Requests\StoreQuestionRequest;
use App\Http\Requests\UpdateQuestionRequest;
use App\Http\Resources\QuestionResource;
use App\Models\Form;
use Illuminate\Http\Client\Request;
use Illuminate\Support\Facades\Auth;

class QuestionController extends Controller
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
     * @param  \App\Http\Requests\StoreQuestionRequest  $request
     * @return \Illuminate\Http\Response
     */
    public function store($formSlug, Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'choice_type' => 'required|in:short answer,paragraph,date,multiple choice,dropdown,checkboxes',
            'choices' => 'nullable|array|required_if:choice_type,multiple choice,dropdown,checkboxes',
            'choices.*' => 'string|min:1|max:255',
            'is_required' => 'required|boolean'
        ]);

        $form = Form::where('slug', $formSlug)->first();
        
        if($form->creator_id !== Auth::id()) {
            return response()->json([
                'message' => 'Forbidden Access'
            ], 403);
        }
        

        if(!$form) {
            return response()->json([
                'message' => 'invalid form slug'
            ], 404);
        }

        $question = Question::create([
            'name' => $validated['name'],
            'choice_type' => $validated['choice_type'],
            'is_required' => $validated['is_required'],
            'choices' => $validated['choices'],
            'form_id' => $form->id
        ]);

        return response()->json([
            'message' => 'Add question success',
            'question' => (new QuestionResource($question))
        ],200);
    
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Question  $question
     * @return \Illuminate\Http\Response
     */
    public function show(Question $question)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\Question  $question
     * @return \Illuminate\Http\Response
     */
    public function edit(Question $question)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \App\Http\Requests\UpdateQuestionRequest  $request
     * @param  \App\Models\Question  $question
     * @return \Illuminate\Http\Response
     */
    public function update(UpdateQuestionRequest $request, Question $question)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Question  $question
     * @return \Illuminate\Http\Response
     */
    public function destroy($formSlug,$questionId   )
    {
        $form = Form::where('slug', $formSlug)->first();

        if(!$form) {
            return response()->json([
                'message' => 'Form not found'
            ], 404);
        }
        if($form->creator_id !== Auth::id()) {
            return response()->json([
                'message' => 'Forbidden access'
            ], 403);
        }

        $question = Question::find($questionId);

        if(!$question) {
            return response()->json([
                'message' => 'Question not found'
            ], 404);
        }

        $question->delete();

        return response()->json([
            'message' => 'Remove question success'
        ], 200);
    }
}
