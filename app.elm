import Html exposing (..)
import Html.App as Html
import Html.Attributes exposing (..)
import Html.Events exposing (..)
import Http
import Json.Decode as Json
import Task

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
  , results : String
  }


-- UPDATE

type Msg 
  = Search String
  | SearchSucceed String
  | SearchFail Http.Error

update : Msg -> Model -> (Model, Cmd Msg)
update msg model =
  case msg of
    Search searchText ->
      (Model searchText "no results.", searchCourse searchText)

    SearchSucceed resultJson ->
      (Model model.searchText resultJson, Cmd.none)

    SearchFail httpError ->
      (model, Cmd.none)


-- VIEW

view : Model -> Html Msg
view model =
  div [] 
    [ input [ placeholder "Search for courses...", onInput Search ] []
    , div [ class "results" ] [ text model.results ]
    ]


-- SUBSCRIPTIONS

subscriptions : Model -> Sub Msg
subscriptions model =
  Sub.none


-- INIT

init : (Model, Cmd Msg)
init =
  (Model "" "no results.", Cmd.none)


-- HTTP

searchCourse : String -> Cmd Msg
searchCourse searchText =
  let
    url =
      "http://api.classmere.com/search/courses/" ++ searchText
  in
    Task.perform SearchFail SearchSucceed (Http.getString url)


-- JSON

type alias Course =
  { id : String
  , title : String
  , subjectCode : String
  , courseNumber : Int
  , credits : String
  , description : String
  , prereqs : String
  , sections : List Section
  }

type alias Section =
  { term : String
  , session : String
  , crn : Int
  , credits : Int
  , meetingTimes : String
  , startDate : String
  , endDate : String
  , campus : String
  , kind : String
  , status : String
  , enrollmentCapacity : Int
  , enrollmentCurrent : Int
  , waitlistCapacity :Int
  , waitlistCurrent : Int
  , fees : String
  , restrictions : String
  , comments : String
  , textbookUrl : String
  }
