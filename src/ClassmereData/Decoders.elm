module ClassmereData.Decoders exposing ( courseDecoder )


import Json.Decode exposing (..)
import ClassmereData.Models exposing (Course)

courseDecoder : Decoder (List Course)
courseDecoder =
  Json.Decode.list
    (map6 Course
      (field "_id" string)
      (field "title" string)
      (field "subjectCode" string)
      (field "courseNumber" int)
      (field "credits" string)
      (field "description" string))
