module HangmanTypes exposing (Model, Msg(..))

import HangmanSourceTexts exposing (sourceText)
import Set exposing (Set)



-- Model type


type alias Model =
    { hangmanPhrase : String
    , inputField : String
    , guessedChars : Set String
    , selectedSourceText : String
    , selectedWordCount : Int
    }



-- Msg type


type Msg
    = SaveHangmanPhrase
    | SaveInputSoFar String
    | GuessButton String
    | GenerateRandomTextIndex String Int
    | NewRandomTextIndex Int
    | RevealPhrase
    | Reset
