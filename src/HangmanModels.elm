module HangmanModels exposing (alterCharacterSet, alterInputField, init, initWithHangmanPhrase, querryRandomTextIndex)

import HangmanHelpers exposing (randomTextIndex)
import HangmanSourceTexts exposing (sourceText)
import HangmanTypes exposing (Model, Msg(..))
import Set exposing (insert)



-- init / model functions


init : () -> ( Model, Cmd Msg )
init _ =
    ( initRecord
    , Cmd.none
    )


initRecord : Model
initRecord =
    { hangmanPhrase = " "
    , inputField = ""
    , guessedChars = Set.empty
    }


initWithHangmanPhrase : String -> ( Model, Cmd Msg )
initWithHangmanPhrase phrase =
    if phrase == "" then
        init ()

    else
        ( { initRecord | hangmanPhrase = phrase }
        , Cmd.none
        )


alterCharacterSet : Model -> String -> ( Model, Cmd Msg )
alterCharacterSet model char =
    ( { model | guessedChars = Set.insert char model.guessedChars }
    , Cmd.none
    )


alterInputField : Model -> String -> ( Model, Cmd Msg )
alterInputField model inputText =
    ( { model | inputField = inputText }
    , Cmd.none
    )


querryRandomTextIndex : Model -> String -> ( Model, Cmd Msg )
querryRandomTextIndex model text =
    ( model, randomTextIndex text )
