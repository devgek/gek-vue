package main

import (
	"log"
	"net/http"
)

func main() {
	/*
		fs := http.FileServer(http.Dir("vue"))
		http.Handle("/vue/", http.StripPrefix("/vue/", fs))
	*/
	log.Println("Listening on port 7080 for /vue/ ...")
	http.Handle("/", http.FileServer(http.Dir(".")))
	if err := http.ListenAndServe(":7080", nil); err != nil {
		panic(err)
	}
}
