<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class QuestionResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array|\Illuminate\Contracts\Support\Arrayable|\JsonSerializable
     */
    public function toArray($request)
    {
        return [
            'name' => $this->name,
            'choice_type' => $this->choice_type,
            'is_required' => $this->is_required,
            'choices' => $this->choices,
            'form_id' => $this->form_id,
            'id' => $this->id
        ];
    }
}
