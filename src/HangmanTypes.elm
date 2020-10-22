module HangmanTypes exposing (Model, Msg(..))

import Set exposing (Set)



-- Model type


type alias Model =
    { hangmanPhrase : String
    , inputField : String
    , guessedChars : Set String
    }



-- Msg type


type Msg
    = SaveHangmanPhrase
    | SaveInputSoFar String
    | GuessButton String
    | GenerateRandomTextIndex String
    | NewRandomTextIndex Int
    | Reset
