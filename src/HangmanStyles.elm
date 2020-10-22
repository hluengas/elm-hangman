module HangmanStyles exposing (styledButtonGuessedCorrect, styledButtonGuessedWrong, styledButtonMain, styledButtonUnguessed, styledForm, styledInput)

-- import Css exposing (..)

import Css
    exposing
        ( alignSelf
        , backgroundColor
        , border
        , borderRadius
        , center
        , color
        , fontSize
        , height
        , hex
        , margin2
        , margin4
        , marginBottom
        , marginLeft
        , marginRight
        , marginTop
        , padding
        , padding2
        , padding4
        , paddingBottom
        , pct
        , px
        , width
        )
import HangmanColors exposing (buttonMainColor, correctColor, unGuessedColor, wallpaperColor, wrongColor)
import Html.Styled exposing (Attribute, Html, styled)



-- style components


styledForm : List (Attribute msg) -> List (Html msg) -> Html msg
styledForm =
    styled Html.Styled.form
        [ borderRadius (px 25)
        , backgroundColor (hex wallpaperColor)
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
        , borderRadius (px 10)
        ]


styledButtonMain : List (Attribute msg) -> List (Html msg) -> Html msg
styledButtonMain =
    styled Html.Styled.button
        [ width (pct 20)
        , backgroundColor (hex buttonMainColor)
        , color (hex "#fff")
        , padding4 (px 20) (px 20) (px 20) (px 20)
        , border (px 0)
        , margin4 (px 20) (px 20) (px 20) (px 20)
        , borderRadius (px 20)
        , fontSize (px 24)
        ]


styledButtonUnguessed : List (Attribute msg) -> List (Html msg) -> Html msg
styledButtonUnguessed =
    styled Html.Styled.button
        [ width (pct 10)
        , backgroundColor (hex unGuessedColor)
        , color (hex "#fff")
        , padding (px 10)
        , marginTop (px 10)
        , marginBottom (px 10)
        , marginLeft (px 1)
        , marginRight (px 1)
        , border (px 0)
        , borderRadius (px 20)
        , fontSize (px 24)
        ]


styledButtonGuessedCorrect : List (Attribute msg) -> List (Html msg) -> Html msg
styledButtonGuessedCorrect =
    styled Html.Styled.button
        [ width (pct 10)
        , backgroundColor (hex correctColor)
        , color (hex "#fff")
        , padding (px 10)
        , marginTop (px 10)
        , marginBottom (px 10)
        , marginLeft (px 1)
        , marginRight (px 1)
        , border (px 0)
        , borderRadius (px 20)
        , fontSize (px 24)
        ]


styledButtonGuessedWrong : List (Attribute msg) -> List (Html msg) -> Html msg
styledButtonGuessedWrong =
    styled Html.Styled.button
        [ width (pct 10)
        , backgroundColor (hex wrongColor)
        , color (hex "#fff")
        , padding (px 10)
        , marginTop (px 10)
        , marginBottom (px 10)
        , marginLeft (px 1)
        , marginRight (px 1)
        , border (px 0)
        , borderRadius (px 20)
        , fontSize (px 24)
        ]
