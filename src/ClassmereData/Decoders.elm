module ClassmereData.Decoders exposing (courseDecoder, courseListDecoder)

import Json.Decode exposing (..)
import Json.Decode.Pipeline exposing (..)
import ClassmereData.Models exposing (Course, Section, MeetingTime)


-- Courses


courseDecoder : Decoder Course
courseDecoder =
    decode Course
        |> required "_id" string
        |> required "title" string
        |> required "subjectCode" string
        |> required "courseNumber" int
        |> required "credits" string
        |> required "description" string
        |> required "prereqs" (maybe string)
        |> required "updated" string
        |> required "sections" (maybe sectionListDecoder)


courseListDecoder : Decoder (List Course)
courseListDecoder =
    list courseDecoder



-- Sections


sectionDecoder : Decoder Section
sectionDecoder =
    decode Section
        |> required "term" string
        |> required "session" string
        |> required "crn" int
        |> optional "credits" int 0
        |> required "instructor" string
        |> required "meetingTimes" (maybe meetingTimeListDecoder)
        |> required "startDate" string
        |> required "endDate" string
        |> required "campus" string
        |> required "type" string
        |> required "status" string
        |> required "enrollmentCapacity" int
        |> required "enrollmentCurrent" int
        |> required "waitlistCapacity" int
        |> required "waitlistCurrent" int
        |> required "fees" string
        |> required "restrictions" string
        |> optional "comments" string ""
        |> optional "textBookUrl" string ""


sectionListDecoder : Decoder (List Section)
sectionListDecoder =
    list sectionDecoder



-- MeetingTimes


meetingTimeDecoder : Decoder MeetingTime
meetingTimeDecoder =
    decode MeetingTime
        |> required "startTime" string
        |> required "endTime" string
        |> required "days" string
        |> required "buildingCode" string
        |> required "roomNumber" (maybe int)


meetingTimeListDecoder : Decoder (List MeetingTime)
meetingTimeListDecoder =
    list meetingTimeDecoder
