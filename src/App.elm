import Html exposing (..)
import Html.App as Html
import Html.Attributes exposing (..)
import Html.Events exposing (..)
import Http
import Task
import ClassmereData.Models exposing (Course, Section)
import ClassmereData.Decoders exposing (courseDecoder)


main : Program Never
main =
  Html.program
    { init = init
    , view = view
    , update = update
    , subscriptions = subscriptions
    }


-- MODEL

type alias Model =
  { searchText : String
  , results : List Course
  }


-- REMOVE LATER
emptyCourse : Course
emptyCourse = Course "id" "title" "subjectCode" 0 "credits" "description"


-- UPDATE

type Msg 
  = Search String
  | SearchSucceed (List Course)
  | SearchFail Http.Error

update : Msg -> Model -> (Model, Cmd Msg)
update msg model =
  case msg of
    Search searchText ->
      (Model searchText [ emptyCourse ], searchCourse searchText)

    SearchSucceed resultJson ->
      (Model model.searchText resultJson, Cmd.none)

    SearchFail httpError ->
      (model, Cmd.none)


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
    [ td [] [ text course.title ] 
    , td [] [ text course.description ]
    ]


-- SUBSCRIPTIONS

subscriptions : Model -> Sub Msg
subscriptions model =
  Sub.none


-- INIT

init : (Model, Cmd Msg)
init =
  (Model "" [ emptyCourse ], Cmd.none)


-- HTTP

searchCourse : String -> Cmd Msg
searchCourse searchText =
  let
    url =
      "http://api.classmere.com/search/courses/" ++ searchText
  in
    Task.perform SearchFail SearchSucceed (Http.get courseDecoder url)
