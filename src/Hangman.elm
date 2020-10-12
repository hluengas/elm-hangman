module Hangman exposing (..)

import Array exposing (Array)
import Browser exposing (sandbox)
import Css exposing (..)
import Html.Styled exposing (Attribute, Html, button, div, h1, h2, h3, h4, input, pre, span, styled, text, toUnstyled)
import Html.Styled.Attributes exposing (css, id, type_, value)
import Html.Styled.Events exposing (onClick, onInput, onSubmit)
import Set exposing (Set)



-- Model type


type alias Model =
    { inputPhrase : String
    , inputSoFar : String
    , guessedChars : Set String
    , numIncorrectGuesses : Int
    , resultPhrase : String
    }



-- Msg type


type Msg
    = SaveInputPhrase
    | SaveInputSoFar String
    | GuessButton String
    | Reset
    | NoOp



-- init function


init : Model
init =
    { inputPhrase = " "
    , inputSoFar = ""
    , guessedChars = Set.empty
    , numIncorrectGuesses = 0
    , resultPhrase = "_"
    }



-- view funtion


view : Model -> Html Msg
view model =
    div []
        [ styledForm [ onSubmit SaveInputPhrase ]
            [ titleHtml
            , inputHtml model
            , submitButtonHtml
            , resetButtonHtml
            , buttonsHtml
            , phraseHtml model
            , hangmanHtml model
            ]
        ]



-- update function


update : Msg -> Model -> Model
update message model =
    case message of
        SaveInputSoFar inputSoFar ->
            { model | inputSoFar = inputSoFar }

        SaveInputPhrase ->
            { model
                | inputPhrase = model.inputSoFar
                , inputSoFar = ""
                , guessedChars = init.guessedChars
                , numIncorrectGuesses = init.numIncorrectGuesses
                , resultPhrase =
                    model.inputSoFar
                        |> String.split ""
                        |> List.map
                            (\c ->
                                if c == " " then
                                    " "

                                else if Set.member (String.toLower c) model.guessedChars then
                                    c

                                else
                                    "_"
                            )
                        |> String.concat
            }

        GuessButton char ->
            if String.contains char model.inputPhrase then
                { model
                    | guessedChars = Set.insert char model.guessedChars
                    , resultPhrase =
                        model.inputPhrase
                            |> String.split ""
                            |> List.map
                                (\c ->
                                    if c == " " then
                                        " "

                                    else if Set.member (String.toLower c) model.guessedChars then
                                        c

                                    else if String.contains (String.toLower c) char then
                                        c

                                    else
                                        "_"
                                )
                            |> String.concat
                }

            else
                { model
                    | guessedChars = Set.insert char model.guessedChars
                    , numIncorrectGuesses = model.numIncorrectGuesses + 1
                }

        Reset ->
            init

        NoOp ->
            model



-- alphabet constant


alphabet : List String
alphabet =
    String.split "" "ABCDEFGHIJKLMNOPQRSTUVWXYZ"



-- hangman ascii art constant


hangmanArt : Array String
hangmanArt =
    Array.fromList
        [ """
+---+---+

|   ≣   |

|       |

|       |

|       |

|       |

=========""", """
+---+---+

|   ≣   |

|   0   |

|       |

|       |

|       |

=========""", """
+---+---+

|   ≣   |

|   0   |

|   |   |

|       |

|       |

=========""", """
+---+---+

|   ≣   |

|   0   |

|  /|   |

|       |

|       |

=========""", """
+---+---+

|   ≣   |

|   0   |

|  /|\\  |

|       |

|       |

=========""", """
+---+---+

|   ≣   |

|   0   |

|  /|\\  |

|  /    |

|       |

=========""" ]



-- html components


titleHtml : Html Msg
titleHtml =
    div
        [ css
            [ textAlign center
            , fontSize (px 32)
            ]
        ]
        [ h1 [] [ text "Hangman Game" ] ]


inputHtml : Model -> Html Msg
inputHtml model =
    div
        [ css
            [ textAlign center
            , alignItems center
            ]
        ]
        [ div [ css [ fontSize (px 24) ] ] [ text "Input Phrase" ]
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
            [ textAlign center
            , alignItems center
            , padding4 (px 2) (px 2) (px 2) (px 2)
            ]
        ]
        [ styledSubmitButton
            [ type_ "button"
            , onClick SaveInputPhrase
            ]
            [ text "Submit Phrase" ]
        ]


resetButtonHtml : Html Msg
resetButtonHtml =
    div
        [ css
            [ textAlign center
            , alignItems center
            , padding4 (px 2) (px 2) (px 2) (px 2)
            ]
        ]
        [ styledSubmitButton
            [ type_ "button"
            , onClick Reset
            ]
            [ text "Reset Game" ]
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
                [ textAlign center
                , alignItems center
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
                        [ padding (px 2)
                        , fontSize (px 32)
                        ]
                    ]
                    [ text char ]
            )
        |> div
            [ css
                [ textAlign center
                , alignItems center
                ]
            ]


hangmanHtml : Model -> Html Msg
hangmanHtml model =
    case Array.get model.numIncorrectGuesses hangmanArt of
        Nothing ->
            div [] deadHangmanHtml

        Just hangmanAscii ->
            if String.contains model.resultPhrase model.inputPhrase then
                div [] (winningHangmanHtml hangmanAscii)

            else
                div [] (livingHangmanHtml hangmanAscii)


winningHangmanHtml : String -> List (Html Msg)
winningHangmanHtml asciiArt =
    [ Html.Styled.pre
        [ css
            [ textAlign center
            , alignItems center
            , fontSize (px 32)
            , lineHeight (pct 50)
            ]
        ]
        [ text asciiArt ]
    , Html.Styled.pre
        [ css
            [ textAlign center
            , alignItems center
            , fontSize (px 32)
            , lineHeight (pct 50)
            ]
        ]
        [ text "You Win!" ]
    ]


livingHangmanHtml : String -> List (Html Msg)
livingHangmanHtml asciiArt =
    [ Html.Styled.pre
        [ css
            [ textAlign center
            , alignItems center
            , fontSize (px 32)
            , lineHeight (pct 50)
            ]
        ]
        [ text asciiArt ]
    , Html.Styled.pre
        [ css
            [ textAlign center
            , alignItems center
            , fontSize (px 32)
            , lineHeight (pct 50)
            ]
        ]
        [ text "" ]
    ]


deadHangmanHtml : List (Html Msg)
deadHangmanHtml =
    [ Html.Styled.pre
        [ css
            [ textAlign center
            , alignItems center
            , fontSize (px 32)
            , lineHeight (pct 50)
            ]
        ]
        [ text
            """
+---+---+

|   ≣   |

|   0   |

|  /|\\  |

|  / \\  |

|       |

=========
                """
        ]
    , Html.Styled.pre
        [ css
            [ textAlign center
            , alignItems center
            , fontSize (px 32)
            , lineHeight (pct 50)
            ]
        ]
        [ text "You Lose!" ]
    ]



-- style components


styledForm : List (Attribute msg) -> List (Html msg) -> Html msg
styledForm =
    styled Html.Styled.form
        [ borderRadius (px 25)
        , backgroundColor (hex "#c0c0c0")
        , width (pct 100)
        , height (pct 100)
        , alignSelf center
        , paddingBottom (pct 2)
        ]


styledInput : List (Attribute msg) -> List (Html msg) -> Html msg
styledInput =
    styled Html.Styled.input
        [ width (pct 25)
        , padding2 (px 12) (px 20)
        , margin2 (px 8) (px 0)
        , border (px 0)
        , borderRadius (px 4)
        ]


styledSubmitButton : List (Attribute msg) -> List (Html msg) -> Html msg
styledSubmitButton =
    styled Html.Styled.button
        [ width (pct 80)
        , backgroundColor (hex "#397cd5")
        , color (hex "#fff")
        , padding4 (px 20) (px 20) (px 20) (px 20)
        , border (px 0)
        , borderRadius (px 4)
        , fontSize (px 24)
        ]


styledCharacterButton : List (Attribute msg) -> List (Html msg) -> Html msg
styledCharacterButton =
    styled Html.Styled.button
        [ width (pct 7)
        , backgroundColor (hex "#397cd5")
        , color (hex "#fff")
        , padding (px 10)
        , marginTop (px 10)
        , marginBottom (px 10)
        , marginLeft (px 1)
        , marginRight (px 1)
        , border (px 0)
        , borderRadius (px 4)
        , fontSize (px 24)
        ]



-- main function


main : Program () Model Msg
main =
    Browser.sandbox
        { init = init
        , view = view >> toUnstyled
        , update = update
        }
