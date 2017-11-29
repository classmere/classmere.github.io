module ClassmereData.Models exposing ( Course, Section )


type alias Course =
  { id : String
  , title : String
  , subjectCode : String
  , courseNumber : Int
  , credits : String
  , description : String
  --, sections : (Maybe (List Section))
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
  , waitlistCapacity : Int
  , waitlistCurrent : Int
  , fees : String
  , restrictions : String
  , comments : String
  , textbookUrl : String
  }