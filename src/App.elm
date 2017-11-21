import Html exposing (..)
import Html.Attributes exposing (..)
import Html.Events exposing (..)
import Http

import ClassmereData.Models exposing (Course, Section)
import ClassmereData.Decoders exposing (courseDecoder)



main : Program Never Model Msg
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



-- UPDATE


type Msg
  = Search String
  | NewSearchResults (Result Http.Error (List Course))


update : Msg -> Model -> (Model, Cmd Msg)
update msg model =
  case msg of
    Search searchTerm ->
      (model, searchCourse searchTerm)

    NewSearchResults (Ok courseList) ->
      ({ model | results = courseList }, Cmd.none)

    NewSearchResults (Err _) ->
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




-- HTTP


searchCourse : String -> Cmd Msg
searchCourse searchTerm =
  let
    url =
      "https://api.classmere.com/search/courses/" ++ searchTerm
  in
     Http.send NewSearchResults (Http.get url courseDecoder)



-- INIT


init : (Model, Cmd Msg)
init =
    (Model "" [], Cmd.none)
