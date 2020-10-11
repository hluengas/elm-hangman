module Hangman exposing (..)

import Browser exposing (sandbox)
import Css exposing (..)
import Html.Styled exposing (Attribute, Html, button, div, h1, h2, h3, h4, input, span, styled, text, toUnstyled)
import Html.Styled.Attributes exposing (css, id, type_, value)
import Html.Styled.Events exposing (onClick, onInput, onSubmit)
import Set exposing (Set)



-- Model type


type alias Model =
    { inputPhrase : String
    , inputSoFar : String
    , guessedChars : Set String
    }



-- Msg types


type Msg
    = SaveInputPhrase
    | SaveInputSoFar String
    | GuessButton String
    | NoOp



-- init function


init : Model
init =
    { inputPhrase = ""
    , inputSoFar = ""
    , guessedChars = Set.empty
    }



-- view funtion


view : Model -> Html Msg
view model =
    div []
        [ styledForm [ onSubmit SaveInputPhrase ]
            [ titleHtml
            , inputHtml model
            , submitButtonHtml
            , buttonsHtml
            , phraseHtml model
            ]
        ]



-- update function


update : Msg -> Model -> Model
update message model =
    case message of
        SaveInputSoFar inputSoFar ->
            { model | inputSoFar = inputSoFar }

        SaveInputPhrase ->
            { model | inputPhrase = model.inputSoFar, inputSoFar = "" }

        GuessButton char ->
            { model | guessedChars = Set.insert char model.guessedChars }

        NoOp ->
            model



-- alphabet constant


alphabet : List String
alphabet =
    String.split "" "ABCDEFGHIJKLMNOPQRSTUVWXYZ"



-- html components


titleHtml : Html Msg
titleHtml =
    div
        [ css
            [ textAlign center
            , fontSize (px 48)
            ]
        ]
        [ text "Hangman Game" ]


inputHtml : Model -> Html Msg
inputHtml model =
    div
        [ css
            [ textAlign center
            , alignItems center
            ]
        ]
        [ div [ css [ fontSize (px 32) ] ] [ text "Input Phrase" ]
        , styledInput
            [ id "input"
            , type_ "text"
            , onInput SaveInputSoFar
            , value model.inputSoFar
            ]
            []
        ]


submitButtonHtml : Html Msg
submitButtonHtml =
    div
        [ css
            [ Css.textAlign Css.center
            , Css.alignItems Css.center
            ]
        ]
        [ styledSubmitButton
            [ type_ "button"
            , onClick SaveInputPhrase
            ]
            [ text "Submit Phrase" ]
        ]


buttonsHtml : Html Msg
buttonsHtml =
    alphabet
        |> List.map
            (\char ->
                styledCharacterButton
                    [ type_ "button"
                    , onClick (GuessButton (String.toLower char))
                    ]
                    [ text char ]
            )
        |> div
            [ css
                [ Css.textAlign Css.center
                , Css.alignItems Css.center
                ]
            ]


phraseHtml : Model -> Html Msg
phraseHtml model =
    model.inputPhrase
        |> String.split ""
        |> List.map
            (\char ->
                if char == " " then
                    " "

                else if Set.member (String.toLower char) model.guessedChars then
                    char

                else
                    "_"
            )
        |> List.map
            (\char ->
                span
                    [ css
                        [ Css.padding (px 2)
                        , Css.fontSize (px 32)
                        ]
                    ]
                    [ text char ]
            )
        |> div
            [ css
                [ Css.textAlign Css.center
                , Css.alignItems Css.center
                ]
            ]



-- style components


styledForm : List (Attribute msg) -> List (Html msg) -> Html msg
styledForm =
    styled Html.Styled.form
        [ borderRadius (px 50)
        , backgroundColor (hex "#f2f2f2")
        , Css.width (pct 50)
        , Css.height (pct 50)
        , Css.margin (px 0)
        , Css.position absolute
        , Css.left (pct 25)
        , Css.top (pct 25)
        ]


styledInput : List (Attribute msg) -> List (Html msg) -> Html msg
styledInput =
    styled Html.Styled.input
        [ width (px 260)
        , padding2 (px 12) (px 20)
        , margin2 (px 8) (px 0)
        , border (px 0)
        , borderRadius (px 4)
        ]


styledSubmitButton : List (Attribute msg) -> List (Html msg) -> Html msg
styledSubmitButton =
    styled Html.Styled.button
        [ width (pct 15)
        , backgroundColor (hex "#397cd5")
        , color (hex "#fff")
        , padding2 (px 12) (px 20)
        , border (px 0)
        , borderRadius (px 4)
        , fontSize (px 32)
        ]


styledCharacterButton : List (Attribute msg) -> List (Html msg) -> Html msg
styledCharacterButton =
    styled Html.Styled.button
        [ Css.width (px 30)
        , backgroundColor (hex "#397cd5")
        , color (hex "#fff")
        , padding (px 10)
        , marginTop (px 10)
        , marginBottom (px 10)
        , marginLeft (px 1)
        , marginRight (px 1)
        , border (px 0)
        , borderRadius (px 4)
        , fontSize (px 16)
        ]



-- main function


main : Program () Model Msg
main =
    Browser.sandbox
        { init = init
        , view = view >> toUnstyled
        , update = update
        }
