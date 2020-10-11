module Hangman exposing (..)

import Browser exposing (sandbox)
import Css exposing (..)
import Html.Styled exposing (..)
import Html.Styled.Attributes exposing (..)
import Html.Styled.Events exposing (onClick, onInput, onSubmit)
import Set exposing (Set)
import Svg.Styled.Attributes exposing (mode)



-- import VirtualDom


type alias Model =
    { inputPhrase : String
    , inputSoFar : String
    , guessedChars : Set String
    }


type Msg
    = SaveInputPhrase
    | SaveInputSoFar String
    | GuessButton String
    | NoOp


initialModel : Model
initialModel =
    { inputPhrase = ""
    , inputSoFar = ""
    , guessedChars = Set.empty
    }


alphabet : List String
alphabet =
    String.split "" "ABCDEFGHIJKLMNOPQRSTUVWXYZ"


view : Model -> Html Msg
view model =
    let
        titleHtml =
            div
                [ css [ Css.textAlign Css.center ] ]
                [ h1 [] [ text "Hangman Game" ]
                ]

        inputHtml =
            div
                [ css
                    [ Css.textAlign Css.center
                    , Css.alignItems Css.center
                    ]
                ]
                [ h2 [] [ text "Input Phrase" ]
                , styledInput
                    [ id "input"
                    , type_ "text"
                    , onInput SaveInputSoFar
                    , value model.inputSoFar
                    ]
                    []
                ]

        submitButtonHtml =
            div []
                [ styledPhraseButton
                    [ type_ "button"
                    , onClick SaveInputPhrase
                    ]
                    [ text "Submit Phrase" ]
                ]

        phraseHtml =
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
                |> div []

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
                    []
    in
    div []
        [ styledForm [ onSubmit SaveInputPhrase ]
            [ titleHtml
            , inputHtml
            , submitButtonHtml
            , buttonsHtml
            , phraseHtml
            ]
        ]


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
        [ display block
        , Css.width (px 260)
        , padding2 (px 12) (px 20)
        , margin2 (px 8) (px 0)
        , border (px 0)
        , borderRadius (px 4)
        ]


styledPhraseButton : List (Attribute msg) -> List (Html msg) -> Html msg
styledPhraseButton =
    styled Html.Styled.button
        [ Css.width (px 300)
        , backgroundColor (hex "#397cd5")
        , color (hex "#fff")
        , padding2 (px 14) (px 20)
        , marginTop (px 10)
        , marginBottom (px 10)
        , border (px 0)
        , borderRadius (px 4)
        , fontSize (px 16)
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


main : Program () Model Msg
main =
    Browser.sandbox
        { init = initialModel
        , view = view >> toUnstyled
        , update = update
        }
