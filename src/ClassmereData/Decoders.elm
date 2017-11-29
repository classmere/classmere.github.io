module ClassmereData.Decoders exposing ( courseDecoder, courseListDecoder )


import Json.Decode exposing (..)
import Json.Decode.Pipeline exposing (..)


import ClassmereData.Models exposing ( Course, Section )

courseDecoder : Decoder Course
courseDecoder =
  decode Course
    |> required "_id" string
    |> required "title" string
    |> required "subjectCode" string
    |> required "courseNumber" int
    |> required "credits" string
    |> required "description" string

courseListDecoder : Decoder (List Course)
courseListDecoder = list courseDecoder
