import Html exposing (..)
import Html.Attributes exposing (..)
import Html.Events exposing (..)
import Http
import Navigation exposing ( Location )
import UrlParser exposing (..)

import ClassmereData.Models exposing ( Course, Section )
import ClassmereData.Decoders exposing ( courseDecoder, courseListDecoder )



main : Program Never Model Msg
main =
  Navigation.program LocationChange
    { init = init
    , view = view
    , update = update
    , subscriptions = subscriptions
    }



-- MODEL


-- TODO: Add current course to to record
type alias Model =
  { searchText : String
  , results : List Course
  , route : Route
  }


type Route
  = Home
  | CourseDetail String Int
  | NotFound



-- ROUTING


matchers : Parser (Route -> a) a
matchers =
  oneOf
    [ UrlParser.map Home top
    , UrlParser.map CourseDetail (UrlParser.s "courses" </> string </> int)
    , UrlParser.map NotFound top
    ]


parseLocation : Location -> Route
parseLocation location =
  case (parseHash matchers location) of
    Just route ->
      route

    Nothing ->
      NotFound



-- UPDATE


type Msg
  = Search String
  | GotSearchResults (Result Http.Error (List Course))
  | GotCourseDetails (Result Http.Error Course)
  | LocationChange Location


update : Msg -> Model -> (Model, Cmd Msg)
update msg model =
  case msg of
    Search searchTerm ->
      (model, getSearchCourse searchTerm)

    GotSearchResults (Ok courseList) ->
      ({ model | results = courseList }, Cmd.none)

    GotSearchResults (Err _) ->
      (model, Cmd.none)

    -- TODO: Change this to update the model
    GotCourseDetails (Ok course) ->
      (model, Cmd.none)
    
    GotCourseDetails (Err _) ->
      (model, Cmd.none)

    LocationChange location ->
      ({ model | route = parseLocation location }, Cmd.none)



-- VIEW


view : Model -> Html Msg
view model =
  case model.route of
    Home ->
      homePage model

    CourseDetail subjectCode courseNumber ->
      courseDetailPage subjectCode courseNumber

    NotFound ->
      notFoundPage


homePage : Model -> Html Msg
homePage model =
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


courseDetailPage : String -> Int -> Html Msg
courseDetailPage subjectCode courseNumber =
  div []
    [ text subjectCode
    , text <| toString courseNumber
    ]
    

notFoundPage : Html msg
notFoundPage =
  div []
    [ text "Not found" ]



-- SUBSCRIPTIONS


subscriptions : Model -> Sub Msg
subscriptions model =
  Sub.none



-- HTTP


baseUrl : String
baseUrl = "https://api.classmere.com"


getSearchCourse : String -> Cmd Msg
getSearchCourse searchTerm =
  let
    url =
      baseUrl ++ "/search/courses/" ++ searchTerm
  in
     Http.send GotSearchResults (Http.get url courseListDecoder)


getCourseDetail : String -> Int -> Cmd Msg
getCourseDetail subjectCode courseNumber =
  let
    url =
      baseUrl ++ "/courses/" ++ subjectCode  ++ "/" ++ (courseNumber |> toString)
  in Http.send GotCourseDetails (Http.get url courseDecoder)



-- INIT


init : Location -> (Model, Cmd Msg)
init location =
  let
    currentRoute =
      parseLocation location
  in
    (Model "" [] currentRoute, Cmd.none)
