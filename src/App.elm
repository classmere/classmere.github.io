module Main exposing (..)

import Html exposing (..)
import Html.Attributes exposing (..)
import Html.Events exposing (..)
import Http
import Navigation exposing (Location)
import UrlParser exposing (..)
import ClassmereData.Models exposing (Course, Section)
import ClassmereData.Decoders exposing (courseDecoder, courseListDecoder)


main : Program Never Model Msg
main =
    Navigation.program LocationChange
        { init = init
        , view = view
        , update = update
        , subscriptions = subscriptions
        }



-- MODEL


type alias Model =
    { searchText : String
    , results : List Course
    , currentCourse : Maybe Course
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


update : Msg -> Model -> ( Model, Cmd Msg )
update msg model =
    case msg of
        Search searchTerm ->
            ( model, getSearchCourse searchTerm )

        GotSearchResults (Ok courseList) ->
            ( { model | results = courseList }, Cmd.none )

        GotSearchResults (Err _) ->
            ( model, Cmd.none )

        GotCourseDetails (Ok course) ->
            ( { model | currentCourse = Just course }, Cmd.none )

        GotCourseDetails (Err _) ->
            ( model, Cmd.none )

        LocationChange location ->
            case parseLocation location of
                CourseDetail subjectCode courseNumber ->
                    ( { model | route = parseLocation location }
                    , getCourseDetail subjectCode courseNumber
                    )

                _ ->
                    ( { model | route = parseLocation location, currentCourse = Nothing }
                    , Cmd.none
                    )



-- VIEW


view : Model -> Html Msg
view model =
    case model.route of
        Home ->
            homePage model

        CourseDetail subjectCode courseNumber ->
            courseDetailPage subjectCode courseNumber model

        NotFound ->
            notFoundPage


homePage : Model -> Html Msg
homePage model =
    div []
        [ h1 [] [ text "classmere." ]
        , input [ placeholder "Search for courses...", onInput Search ] []
        , table [ class "results" ] (List.map renderCourse model.results)
        ]


renderCourse : Course -> Html Msg
renderCourse course =
    let
        url =
            "#courses/" ++ course.subjectCode ++ "/" ++ (toString course.courseNumber)
    in
        tr []
            [ td [] [ a [ href url ] [ text course.title ] ]
            , td [] [ text course.description ]
            ]


courseDetailPage : String -> Int -> Model -> Html Msg
courseDetailPage subjectCode courseNumber model =
    case model.currentCourse of
        Nothing ->
            text "Loading..."

        Just course ->
            div []
                [ h1 []
                    [ text subjectCode
                    , text (courseNumber |> toString)
                    , text " -- "
                    , text course.title
                    ]
                , p [] [ text course.description ]
                , courseDetailTable course.sections
                ]


courseDetailTable : Maybe (List Section) -> Html Msg
courseDetailTable maybeSections =
    case maybeSections of
        Nothing ->
            p [] [ text "Loading..." ]

        Just sections ->
            div []
                [ h2 [] [ text "Sections" ]
                , table []
                    [ thead []
                        [ tr []
                            [ th [] [ text "term" ]
                            , th [] [ text "session" ]
                            , th [] [ text "type" ]
                            , th [] [ text "credits" ]
                            , th [] [ text "instructor" ]
                            , th [] [ text "capacity" ]
                            , th [] [ text "enrolled" ]
                            ]
                        ]
                    , tbody [] (List.map renderSection sections)
                    ]
                ]


renderSection : Section -> Html Msg
renderSection section =
    tr []
        [ td [] [ text section.term ]
        , td [] [ text section.session ]
        , td [] [ text section.kind ]
        , td [] [ text (section.credits |> toString) ]
        , td [] [ text section.instructor ]
        , td [] [ text (section.enrollmentCapacity |> toString) ]
        , td [] [ text (section.enrollmentCurrent |> toString) ]
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
baseUrl =
    "https://api.classmere.com"


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
            baseUrl ++ "/courses/" ++ subjectCode ++ "/" ++ (courseNumber |> toString)
    in
        Http.send GotCourseDetails (Http.get url courseDecoder)



-- INIT


init : Location -> ( Model, Cmd Msg )
init location =
    let
        currentRoute =
            parseLocation location
    in
        case currentRoute of
            CourseDetail subjectCode courseNumber ->
                ( Model "" [] Nothing currentRoute, getCourseDetail subjectCode courseNumber )

            _ ->
                ( Model "" [] Nothing currentRoute, Cmd.none )
