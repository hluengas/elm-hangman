module HangmanModels exposing (alterCharacterSet, alterInputField, init, initWithHangmanPhrase, querryRandomTextIndex, revealPhrase)

import HangmanHelpers exposing (randomTextIndex)
import HangmanSourceTexts exposing (alphabet, sourceText)
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
    , selectedSourceText = sourceText
    , selectedWordCount = 1
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


querryRandomTextIndex : Model -> String -> Int -> ( Model, Cmd Msg )
querryRandomTextIndex model text count =
    ( { model
        | selectedSourceText = text
        , selectedWordCount = count
      }
    , randomTextIndex text
    )


revealPhrase : Model -> ( Model, Cmd Msg )
revealPhrase model =
    ( { model
        | guessedChars =
            alphabet
                |> List.map String.toLower
                |> Set.fromList
      }
    , Cmd.none
    )
