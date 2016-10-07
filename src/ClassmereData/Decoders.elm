module ClassmereData.Decoders exposing ( courseDecoder )


import Json.Decode exposing (..)
import ClassmereData.Models exposing (Course)

courseDecoder : Decoder (List Course)
courseDecoder =
  Json.Decode.list
    (object6 Course
      ("_id" := string)
      ("title" := string)
      ("subjectCode" := string)
      ("courseNumber" := int)
      ("credits" := string)
      ("description" := string))
