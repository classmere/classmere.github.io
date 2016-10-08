import Html exposing (..)
import Html.Attributes exposing (..)
import Html.Events exposing (..)
import Http
import Navigation
import String
import Task
import UrlParser exposing (..)

import ClassmereData.Models exposing (Course, Section)
import ClassmereData.Decoders exposing (courseDecoder)



main : Program Never
main =
  Navigation.program (Navigation.makeParser stringParser)
    { init = init
    , view = view
    , update = update
    , urlUpdate = urlUpdate
    , subscriptions = subscriptions
    }



-- MODEL

type alias Model =
  { searchText : String
  , results : List Course
  , page : Page
  }




-- UPDATE

type Msg 
  = Search String
  | SearchSucceed (List Course)
  | SearchFail Http.Error

update : Msg -> Model -> (Model, Cmd Msg)
update msg model =
  case msg of
    Search searchText ->
      (Model searchText [] model.page, searchCourse searchText)

    SearchSucceed resultJson ->
      (Model model.searchText resultJson model.page, Cmd.none)

    SearchFail httpError ->
      (model, Cmd.none)



-- PARSER

toUrl : Page -> String
toUrl page =
  case page of
    Home -> "/"
    ShowCourse subjectCode courseNumber -> 
      subjectCode ++ "/" ++ (toString courseNumber)

stringParser : Navigation.Location -> Result String Page
stringParser location =
  UrlParser.parse identity desiredPage (String.dropLeft 1 location.hash)

type Page = Home | ShowCourse String Int

desiredPage : Parser (Page -> a) a
desiredPage =
  oneOf
    [ format ShowCourse (UrlParser.s "course" </> string </> int)
    , format Home (UrlParser.s "")
    ]

urlUpdate : Result String Page -> Model -> (Model, Cmd Msg)
urlUpdate result model =
  case result of
    Ok page ->
      ({ model | page = page }, Cmd.none)

    Err _ ->
      (model, Navigation.modifyUrl (toUrl model.page))



-- VIEW

view : Model -> Html Msg
view model =
  div [] 
    [ input [ placeholder "Search for courses...", onInput Search ] []
    , table [ class "results" ] (List.map renderCourse model.results)
    ]

renderCourse : Course -> Html Msg
renderCourse course =
  tr [] 
    [ td [] [ a [ href (toUrl (ShowCourse course.subjectCode course.courseNumber)) ] [ text course.title ] ]
    , td [] [ text course.description ]
    ]



-- SUBSCRIPTIONS

subscriptions : Model -> Sub Msg
subscriptions model =
  Sub.none



-- INIT

init : Result String Page -> (Model, Cmd Msg)
init result =
  urlUpdate result (Model "" [] Home)



-- HTTP

searchCourse : String -> Cmd Msg
searchCourse searchText =
  let
    url =
      "http://api.classmere.com/search/courses/" ++ searchText
  in
    Http.get courseDecoder url
      |> Task.perform SearchFail SearchSucceed
