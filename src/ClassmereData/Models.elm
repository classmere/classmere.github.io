module ClassmereData.Models exposing (Course, Section, MeetingTime)


type alias Course =
    { id : String
    , title : String
    , subjectCode : String
    , courseNumber : Int
    , credits : String
    , description : String
    , prereqs : Maybe String
    , updated : String
    , sections : Maybe (List Section)
    }


type alias Section =
    { term : String
    , session : String
    , crn : Int
    , credits : Int
    , instructor : String
    , meetingTimes : Maybe (List MeetingTime)
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
    , textBookUrl : String
    }


type alias MeetingTime =
    { startTime : String
    , endTime : String
    , days : String
    , buildingCode : String
    , roomNumber : Maybe Int
    }
