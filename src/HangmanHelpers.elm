module HangmanHelpers exposing (addCharactersToSpan, coloredCharacterButton, getRandomPhrase, hiddenPhraseString, hidePhraseCharacters, numIncorrectGuesses, randomTextIndex)

import Array exposing (Array, get, length)
import Css exposing (fontSize, padding, px)
import HangmanTypes exposing (Model, Msg(..))
import HangmanSourceTexts exposing (sourceText)
import HangmanStyles exposing (styledButtonGuessedCorrect, styledButtonGuessedWrong, styledButtonUnguessed)
import Html.Styled exposing (Html, span, text)
import Html.Styled.Attributes exposing (css, type_)
import Html.Styled.Events exposing (onClick)
import Random exposing (generate, int)
import Set exposing (member, toList)



-- Helper Functions


addCharactersToSpan : String -> Html Msg
addCharactersToSpan char =
    span
        [ css
            [ padding (px 2)
            , fontSize (px 32)
            ]
        ]
        [ text char ]


hiddenPhraseString : Model -> String
hiddenPhraseString model =
    model.hangmanPhrase
        |> String.split ""
        |> List.map (hidePhraseCharacters model)
        |> String.concat


hidePhraseCharacters : Model -> String -> String
hidePhraseCharacters model char =
    if char == " " then
        "\u{00A0}\u{00A0}\u{00A0}"

    else if Set.member (String.toLower char) model.guessedChars then
        char

    else
        "_"


coloredCharacterButton : Model -> String -> Html Msg
coloredCharacterButton model char =
    if Set.member (String.toLower char) model.guessedChars then
        if String.contains (String.toLower char) (String.toLower model.hangmanPhrase) then
            styledButtonGuessedCorrect
                [ type_ "button"
                , onClick (GuessButton (String.toLower char))
                ]
                [ text char ]

        else
            styledButtonGuessedWrong
                [ type_ "button"
                , onClick (GuessButton (String.toLower char))
                ]
                [ text char ]

    else
        styledButtonUnguessed
            [ type_ "button"
            , onClick (GuessButton (String.toLower char))
            ]
            [ text char ]


listGuessedChars : Model -> List String
listGuessedChars model =
    Set.toList model.guessedChars


inCorrectCharacterFilter : Model -> String -> Bool
inCorrectCharacterFilter model char =
    not (String.contains char model.hangmanPhrase)


listIncorrectGuesses : Model -> List String
listIncorrectGuesses model =
    listGuessedChars model
        |> List.filter (inCorrectCharacterFilter model)


numIncorrectGuesses : Model -> Basics.Int
numIncorrectGuesses model =
    listIncorrectGuesses model
        |> List.length


randomTextIndex : String -> Cmd Msg
randomTextIndex text =
    text
        |> alphabeticWordsFromText
        |> Array.length
        |> Random.int 0
        |> Random.generate NewRandomTextIndex


alphabeticWordsFromText : String -> Array String
alphabeticWordsFromText text =
    text
        |> String.words
        |> List.map (String.filter Char.isAlpha)
        |> Array.fromList


getRandomPhrase : Int -> String
getRandomPhrase rndNum =
    [ case
        Array.get rndNum (alphabeticWordsFromText sourceText)
      of
        Nothing ->
            "default"

        Just string ->
            string
    , case
        Array.get (rndNum + 1) (alphabeticWordsFromText sourceText)
      of
        Nothing ->
            "default"

        Just string ->
            string
    , case
        Array.get (rndNum + 2) (alphabeticWordsFromText sourceText)
      of
        Nothing ->
            "default"

        Just string ->
            string
    ]
        |> String.join " "
