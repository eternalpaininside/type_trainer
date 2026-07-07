package text_transport_http

import (
	"encoding/json"
	"net/http"
)

type CreateTextRequest struct {
	WordsCount int    `json:"words_count"`
	Language   string `json:"language"`

	IsNumber      bool `json:"is_number"`
	IsPunctuation bool `json:"is_punctuation"`
}

type CreateTextResponse struct {
	Id   int    `json:"id"`
	Text string `json:"text"`
}

func CreateText(
	w http.ResponseWriter, r *http.Request,
) {
	var request CreateTextRequest
	if err := json.NewDecoder(r.Body).Decode(&request); err != nil {
		w.WriteHeader(http.StatusBadRequest)
		return
	}
}
