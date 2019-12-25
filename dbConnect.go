package main

import (
	"database/sql"
	"github.com/sirupsen/logrus"
	"os"
	_ "github.com/lib/pq" // here

  )

  const (
	host     = "localhost"
	port     = 5432
	user     = ""
	password = ""
	dbname   = ""
  )

  var (
	log = logrus.WithField("cmd", "go-realtime-chat")
)

  func main() {
	db, err := sql.Open("postgres", os.Getenv("DATABASE_URL"))
	if err != nil {
	  log.Fatal(err)
	}

	if(db == nil) {
		log.Fatal("db is null")
	} else {
		log.Info("DATABASE_URL:", os.Getenv("DATABASE_URL"))
	}
}