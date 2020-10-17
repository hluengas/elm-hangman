module Hangman exposing (..)

import Array exposing (Array)
import Browser exposing (sandbox)
import Css exposing (..)
import Html.Styled exposing (Attribute, Html, button, div, h1, h2, h3, h4, input, pre, span, styled, text, toUnstyled)
import Html.Styled.Attributes exposing (css, id, type_, value)
import Html.Styled.Events exposing (onClick, onInput, onSubmit)
import Random
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
    | GenerateRandomTextIndex
    | NewRandomTextIndex Int
    | Reset



-- init / model functions


init : () -> ( Model, Cmd Msg )
init _ =
    ( { hangmanPhrase = " "
      , inputField = ""
      , guessedChars = Set.empty
      }
    , Cmd.none
    )


initWithHangmanPhrase : String -> ( Model, Cmd Msg )
initWithHangmanPhrase phrase =
    ( { hangmanPhrase = phrase
      , inputField = ""
      , guessedChars = Set.empty
      }
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


querryRandomTextIndex : Model -> ( Model, Cmd Msg )
querryRandomTextIndex model =
    ( model, randomTextIndex donQuixoteText )



-- view funtion


view : Model -> Html Msg
view model =
    div []
        [ styledForm [ onSubmit SaveHangmanPhrase ]
            [ titleView
            , phraseInputView model
            , mainButtonsView
            , characterButtonsView model
            , hangmanPhraseView model
            , hangmanArtView model
            ]
        ]



-- update function


update : Msg -> Model -> ( Model, Cmd Msg )
update message model =
    case message of
        SaveInputSoFar inputText ->
            alterInputField model inputText

        SaveHangmanPhrase ->
            initWithHangmanPhrase model.inputField

        GuessButton char ->
            alterCharacterSet model char

        GenerateRandomTextIndex ->
            querryRandomTextIndex model

        NewRandomTextIndex index ->
            initWithHangmanPhrase (getRandomPhrase index)

        Reset ->
            init ()



-- html components


titleView : Html Msg
titleView =
    div
        [ css
            [ textAlign center
            , fontSize (px 32)
            ]
        ]
        [ h1 [] [ text "Hangman Game" ] ]


phraseInputView : Model -> Html Msg
phraseInputView model =
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
            , value model.inputField
            ]
            []
        ]


mainButtonsView : Html Msg
mainButtonsView =
    div
        [ css
            [ textAlign center
            , alignItems center
            , padding4 (px 2) (px 2) (px 2) (px 2)
            ]
        ]
        [ styledButtonMain
            [ type_ "button"
            , onClick GenerateRandomTextIndex
            ]
            [ text "Random Phrase" ]
        , styledButtonMain
            [ type_ "button"
            , onClick SaveHangmanPhrase
            ]
            [ text "Submit Phrase" ]
        , styledButtonMain
            [ type_ "button"
            , onClick Reset
            ]
            [ text "Reset Game" ]
        ]


characterButtonsView : Model -> Html Msg
characterButtonsView model =
    alphabet
        |> List.map (coloredCharacterButton model)
        |> div
            [ css
                [ textAlign center
                , alignItems center
                ]
            ]


hangmanPhraseView : Model -> Html Msg
hangmanPhraseView model =
    model.hangmanPhrase
        |> String.split ""
        |> List.map (hidePhraseCharacters model)
        |> List.map addCharactersToSpan
        |> div
            [ css
                [ textAlign center
                , alignItems center
                ]
            ]


hangmanArtView : Model -> Html Msg
hangmanArtView model =
    case Array.get (numIncorrectGuesses model) hangmanArtAlive of
        Nothing ->
            div [] deadHangmanHtml

        Just hangmanAscii ->
            if String.contains "_" (hiddenPhraseString model) then
                div [] (livingHangmanHtml hangmanAscii)

            else
                div [] (winningHangmanHtml hangmanAscii)


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
        [ text "Keep Playing" ]
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
        [ text hangmanArtDead ]
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


wallpaperColor : String
wallpaperColor =
    "#C4FFF9"


buttonMainColor : String
buttonMainColor =
    "#011627"


unGuessedColor : String
unGuessedColor =
    "#6E8894"


correctColor : String
correctColor =
    "#78BC61"


wrongColor : String
wrongColor =
    "#875053"


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
        [ width (pct 30)
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



-- main function


main : Program () Model Msg
main =
    Browser.element
        { init = init
        , view = view >> toUnstyled
        , update = update
        , subscriptions = \_ -> Sub.none
        }



-- Helper Functions / Constants


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


correctCharacterFilter : Model -> String -> Bool
correctCharacterFilter model char =
    String.contains char model.hangmanPhrase


inCorrectCharacterFilter : Model -> String -> Bool
inCorrectCharacterFilter model char =
    not (String.contains char model.hangmanPhrase)


listCorrectGuesses : Model -> List String
listCorrectGuesses model =
    listGuessedChars model
        |> List.filter (correctCharacterFilter model)


listIncorrectGuesses : Model -> List String
listIncorrectGuesses model =
    listGuessedChars model
        |> List.filter (inCorrectCharacterFilter model)


numIncorrectGuesses : Model -> Basics.Int
numIncorrectGuesses model =
    listIncorrectGuesses model
        |> List.length


numCorrectGuesses : Model -> Basics.Int
numCorrectGuesses model =
    listCorrectGuesses model
        |> List.length


alphabet : List String
alphabet =
    String.split "" "ABCDEFGHIJKLMNOPQRSTUVWXYZ"


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
        Array.get rndNum (alphabeticWordsFromText donQuixoteText)
      of
        Nothing ->
            "default"

        Just string ->
            string
    , case
        Array.get (rndNum + 1) (alphabeticWordsFromText donQuixoteText)
      of
        Nothing ->
            "default"

        Just string ->
            string
    , case
        Array.get (rndNum + 2) (alphabeticWordsFromText donQuixoteText)
      of
        Nothing ->
            "default"

        Just string ->
            string
    ]
        |> String.join " "


hangmanArtDead : String
hangmanArtDead =
    """
+---+---+

|   ≣   |

|   0   |

|  /|\\  |

|  / \\  |

|       |

=========
"""


hangmanArtAlive : Array String
hangmanArtAlive =
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


donQuixoteText : String
donQuixoteText =
    """
In a village of La Mancha, the name of which I have no desire to call
to mind, there lived not long since one of those gentlemen that keep a
lance in the lance-rack, an old buckler, a lean hack, and a greyhound
for coursing. An olla of rather more beef than mutton, a salad on most
nights, scraps on Saturdays, lentils on Fridays, and a pigeon or so
extra on Sundays, made away with three-quarters of his income. The rest
of it went in a doublet of fine cloth and velvet breeches and shoes to
match for holidays, while on week-days he made a brave figure in his
best homespun. He had in his house a housekeeper past forty, a niece
under twenty, and a lad for the field and market-place, who used to
saddle the hack as well as handle the bill-hook. The age of this
gentleman of ours was bordering on fifty; he was of a hardy habit,
spare, gaunt-featured, a very early riser and a great sportsman. They
will have it his surname was Quixada or Quesada (for here there is some
difference of opinion among the authors who write on the subject),
although from reasonable conjectures it seems plain that he was called
Quexana. This, however, is of but little importance to our tale; it
will be enough not to stray a hair’s breadth from the truth in the
telling of it.

You must know, then, that the above-named gentleman whenever he was at
leisure (which was mostly all the year round) gave himself up to
reading books of chivalry with such ardour and avidity that he almost
entirely neglected the pursuit of his field-sports, and even the
management of his property; and to such a pitch did his eagerness and
infatuation go that he sold many an acre of tillageland to buy books of
chivalry to read, and brought home as many of them as he could get. But
of all there were none he liked so well as those of the famous
Feliciano de Silva’s composition, for their lucidity of style and
complicated conceits were as pearls in his sight, particularly when in
his reading he came upon courtships and cartels, where he often found
passages like “_the reason of the unreason with which my reason is
afflicted so weakens my reason that with reason I murmur at your
beauty;” or again, “the high heavens, that of your divinity divinely
fortify you with the stars, render you deserving of the desert your
greatness deserves_.” Over conceits of this sort the poor gentleman
lost his wits, and used to lie awake striving to understand them and
worm the meaning out of them; what Aristotle himself could not have
made out or extracted had he come to life again for that special
purpose. He was not at all easy about the wounds which Don Belianis
gave and took, because it seemed to him that, great as were the
surgeons who had cured him, he must have had his face and body covered
all over with seams and scars. He commended, however, the author’s way
of ending his book with the promise of that interminable adventure, and
many a time was he tempted to take up his pen and finish it properly as
is there proposed, which no doubt he would have done, and made a
successful piece of work of it too, had not greater and more absorbing
thoughts prevented him.

Many an argument did he have with the curate of his village (a learned
man, and a graduate of Siguenza) as to which had been the better
knight, Palmerin of England or Amadis of Gaul. Master Nicholas, the
village barber, however, used to say that neither of them came up to
the Knight of Phœbus, and that if there was any that could compare with
_him_ it was Don Galaor, the brother of Amadis of Gaul, because he had
a spirit that was equal to every occasion, and was no finikin knight,
nor lachrymose like his brother, while in the matter of valour he was
not a whit behind him. In short, he became so absorbed in his books
that he spent his nights from sunset to sunrise, and his days from dawn
to dark, poring over them; and what with little sleep and much reading
his brains got so dry that he lost his wits. His fancy grew full of
what he used to read about in his books, enchantments, quarrels,
battles, challenges, wounds, wooings, loves, agonies, and all sorts of
impossible nonsense; and it so possessed his mind that the whole fabric
of invention and fancy he read of was true, that to him no history in
the world had more reality in it. He used to say the Cid Ruy Diaz was a
very good knight, but that he was not to be compared with the Knight of
the Burning Sword who with one back-stroke cut in half two fierce and
monstrous giants. He thought more of Bernardo del Carpio because at
Roncesvalles he slew Roland in spite of enchantments, availing himself
of the artifice of Hercules when he strangled Antæus the son of Terra
in his arms. He approved highly of the giant Morgante, because,
although of the giant breed which is always arrogant and
ill-conditioned, he alone was affable and well-bred. But above all he
admired Reinaldos of Montalban, especially when he saw him sallying
forth from his castle and robbing everyone he met, and when beyond the
seas he stole that image of Mahomet which, as his history says, was
entirely of gold. To have a bout of kicking at that traitor of a
Ganelon he would have given his housekeeper, and his niece into the
bargain.

In short, his wits being quite gone, he hit upon the strangest notion
that ever madman in this world hit upon, and that was that he fancied
it was right and requisite, as well for the support of his own honour
as for the service of his country, that he should make a knight-errant
of himself, roaming the world over in full armour and on horseback in
quest of adventures, and putting in practice himself all that he had
read of as being the usual practices of knights-errant; righting every
kind of wrong, and exposing himself to peril and danger from which, in
the issue, he was to reap eternal renown and fame. Already the poor man
saw himself crowned by the might of his arm Emperor of Trebizond at
least; and so, led away by the intense enjoyment he found in these
pleasant fancies, he set himself forthwith to put his scheme into
execution.

The first thing he did was to clean up some armour that had belonged to
his great-grandfather, and had been for ages lying forgotten in a
corner eaten with rust and covered with mildew. He scoured and polished
it as best he could, but he perceived one great defect in it, that it
had no closed helmet, nothing but a simple morion. This deficiency,
however, his ingenuity supplied, for he contrived a kind of half-helmet
of pasteboard which, fitted on to the morion, looked like a whole one.
It is true that, in order to see if it was strong and fit to stand a
cut, he drew his sword and gave it a couple of slashes, the first of
which undid in an instant what had taken him a week to do. The ease
with which he had knocked it to pieces disconcerted him somewhat, and
to guard against that danger he set to work again, fixing bars of iron
on the inside until he was satisfied with its strength; and then, not
caring to try any more experiments with it, he passed it and adopted it
as a helmet of the most perfect construction.

He next proceeded to inspect his hack, which, with more quartos than a
real and more blemishes than the steed of Gonela, that “_tantum pellis
et ossa fuit_,” surpassed in his eyes the Bucephalus of Alexander or
the Babieca of the Cid. Four days were spent in thinking what name to
give him, because (as he said to himself) it was not right that a horse
belonging to a knight so famous, and one with such merits of his own,
should be without some distinctive name, and he strove to adapt it so
as to indicate what he had been before belonging to a knight-errant,
and what he then was; for it was only reasonable that, his master
taking a new character, he should take a new name, and that it should
be a distinguished and full-sounding one, befitting the new order and
calling he was about to follow. And so, after having composed, struck
out, rejected, added to, unmade, and remade a multitude of names out of
his memory and fancy, he decided upon calling him Rocinante, a name, to
his thinking, lofty, sonorous, and significant of his condition as a
hack before he became what he now was, the first and foremost of all
the hacks in the world.

Having got a name for his horse so much to his taste, he was anxious to
get one for himself, and he was eight days more pondering over this
point, till at last he made up his mind to call himself “Don Quixote,”
whence, as has been already said, the authors of this veracious history
have inferred that his name must have been beyond a doubt Quixada, and
not Quesada as others would have it. Recollecting, however, that the
valiant Amadis was not content to call himself curtly Amadis and
nothing more, but added the name of his kingdom and country to make it
famous, and called himself Amadis of Gaul, he, like a good knight,
resolved to add on the name of his, and to style himself Don Quixote of
La Mancha, whereby, he considered, he described accurately his origin
and country, and did honour to it in taking his surname from it.

So then, his armour being furbished, his morion turned into a helmet,
his hack christened, and he himself confirmed, he came to the
conclusion that nothing more was needed now but to look out for a lady
to be in love with; for a knight-errant without love was like a tree
without leaves or fruit, or a body without a soul. As he said to
himself, “If, for my sins, or by my good fortune, I come across some
giant hereabouts, a common occurrence with knights-errant, and
overthrow him in one onslaught, or cleave him asunder to the waist, or,
in short, vanquish and subdue him, will it not be well to have someone
I may send him to as a present, that he may come in and fall on his
knees before my sweet lady, and in a humble, submissive voice say, ‘I
am the giant Caraculiambro, lord of the island of Malindrania,
vanquished in single combat by the never sufficiently extolled knight
Don Quixote of La Mancha, who has commanded me to present myself before
your Grace, that your Highness dispose of me at your pleasure’?” Oh,
how our good gentleman enjoyed the delivery of this speech, especially
when he had thought of someone to call his Lady! There was, so the
story goes, in a village near his own a very good-looking farm-girl
with whom he had been at one time in love, though, so far as is known,
she never knew it nor gave a thought to the matter. Her name was
Aldonza Lorenzo, and upon her he thought fit to confer the title of
Lady of his Thoughts; and after some search for a name which should not
be out of harmony with her own, and should suggest and indicate that of
a princess and great lady, he decided upon calling her Dulcinea del
Toboso—she being of El Toboso—a name, to his mind, musical, uncommon,
and significant, like all those he had already bestowed upon himself
and the things belonging to him.
"""
