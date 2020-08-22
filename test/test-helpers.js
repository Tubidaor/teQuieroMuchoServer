const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

function makeUsersArray() {
  return [
    {
      id: 1,
      user_id: '73b8bb71-c339-4029-bc70-6204928aa77b',
      first_name: 'juan',
      last_name: 'baltazar',
      email: 'juan.baltazar1@gmail.com',
      birthday: '12/05/1983',
      gender: 'male',
      password: 'faith',
      date_created: '07/07/2020'
    },
    {
      id: 2,
      user_id: '13c0713a-ec31-4378-8aad-37a4c9f4a304',
      first_name: 'megan',
      last_name: 'baltazar',
      email: 'meganlaurel17@gmail.com',
      birthday: '10/17/1981',
      gender: 'female',
      password: 'faith',
      date_created: '07/07/2020'
    }
  ]
}

function makeTextEntries() {
  return [
    {
      id: 1,
      entry_id: '2e537fee-1e43-4357-890c-e96c477ba905',
      text: `Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.`,
      user_id: '73b8bb71-c339-4029-bc70-6204928aa77b',
      date_created: '07/12/2020',
    }, 
    {
      id: 2,
      entry_id: '812ceba5-81d7-49d6-855a-9c2a7db81832',
      text: `Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.`,
      user_id: '73b8bb71-c339-4029-bc70-6204928aa77b',
      date_created: '07/10/2020',
    },
    {
      id: 3,
      entry_id: 'b20a0fa9-1a44-4d99-86fd-dbd8516ecabf',
      text: `Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.`,
      user_id: '73b8bb71-c339-4029-bc70-6204928aa77b',
      date_created: '07/09/2020',
    },
    {
      id: 4,
      entry_id: 'b20a0fa7-1a44-4d99-86fd-dbd8516ecabf',
      text: `Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.`,
      user_id: '13c0713a-ec31-4378-8aad-37a4c9f4a304',
      date_created: '07/09/2020',
    },
    
  ]
}

function makeGenQuestions() {
  return [
    {
      id: 1,
      question_id: 'e773a595-5990-4678-a63c-9ea11f3df831',
      question: "How do you feel mentally, today?",
      category: "Personal",
      section: 'Opening',
      user_id: '73b8bb71-c339-4029-bc70-6204928aa77b'
    },
    {
      id: 2,
      question_id: '4b565474-112b-462a-abbc-17cceaf34e9c',
      question: "How do you feel emotionally, today?",
      category: "Personal",
      section: 'Opening',
      user_id: '73b8bb71-c339-4029-bc70-6204928aa77b'
    },
    {
      id: 3,
      question_id: '6918450a-acca-478b-a890-0659ac50c839',
      question: "How do you feel physically, today?",
      category: "Personal",
      section: 'Opening',
      user_id: '73b8bb71-c339-4029-bc70-6204928aa77b'
    },
    {
      id: 4,
      question_id: '502bda60-984e-42b0-8673-8f35c838eaff',
      question: `How do you feel about your relationship with partner?`,
      category: 'Overall',
      section: 'Relationship',
      user_id: '73b8bb71-c339-4029-bc70-6204928aa77b'
    },
    {
      id: 5,
      question_id: 'f7464740-6c7b-4654-a190-4f6f30395ba8',
      question: `How do you feel about your sex life with partner?`,
      category: 'Sex',
      section: 'Relationship',
      user_id: '73b8bb71-c339-4029-bc70-6204928aa77b'
    },
    {
      id: 6,
      question_id: '04684f9d-d0d6-4f81-9d7b-336938edba51',
      question: `How do you feel about your emotional connection with partner?`,
      category: 'Friendship',
      section: 'Relationship',
      user_id: '73b8bb71-c339-4029-bc70-6204928aa77b'
    },
    {
      id: 7,
      question_id: '6379ee97-a00e-4c31-9cc6-d28469a06f4b',
      question: `How do you feel about the trust between you and partner}?`,
      category: 'Trust',
      section: 'Relationship',
      user_id: '73b8bb71-c339-4029-bc70-6204928aa77b'
    },
    {
      id: 8,
      question_id: 'ca925037-2b20-4d7d-ac41-f3b22452b385',
      question: `How do you feel about the honesty between you and partner?`,
      category: 'Communication',
      section: 'Relationship',
      user_id: '73b8bb71-c339-4029-bc70-6204928aa77b'
    },
    {
      id: 9,
      question_id: '84d2cf7e-8bf7-43cd-97c9-2f1e44f961a2',
      question: `How do you feel about the communication between you and partner?`,
      category: 'Communication',
      section: 'Relationship',
      user_id: '73b8bb71-c339-4029-bc70-6204928aa77b'
    },
    {
      id: 10,
      question_id: 'dbb7564d-3a31-4fec-90fa-2f4e9401ab7b',
      question: `How do you feel about the compromises made between you and partner?`,
      category: 'Compromises',
      section: 'Relationship',
      user_id: '73b8bb71-c339-4029-bc70-6204928aa77b'
    },
    {
      id: 11,
      question_id: 'b8dc039d-5438-4df6-828b-61418a1f70dd',
      question: `How do you feel about your independece?`,
      category: 'Personal',
      section: 'Opening',
      user_id: '73b8bb71-c339-4029-bc70-6204928aa77b'
    },
    {
      id: 12,
      question_id: 'b67382bb-ce5a-4585-a748-3085e30b7c45',
      question: `How do you feel about your partnership with partner?`,
      category: 'Friendship',
      section: 'Relationship',
      user_id: '73b8bb71-c339-4029-bc70-6204928aa77b'
    },
    {
      id: 13,
      question_id: '6775cc23-9349-4f79-8f70-6d4d1f655cf5',
      question: `How do you feel about your friendship with partner?`,
      category: 'Friendship',
      section: 'Relationship',
      user_id: '73b8bb71-c339-4029-bc70-6204928aa77b'
    },
    {
      id: 14,
      question_id: '2e6f62f6-a780-4315-995a-0c2f2809e830',
      question: `How do you feel about parenting with partner?`,
      category: 'Parenting',
      section: 'Relationship',
      user_id: '73b8bb71-c339-4029-bc70-6204928aa77b'
    },
    {
      id: 15,
      question_id: 'e773a605-5990-4678-a63c-9ea11f3df831',
      question: "How do you feel mentally, today?",
      category: "Personal",
      section: 'User',
      user_id: '73b8bb71-c339-4029-bc70-6204928aa77b'
    },
    {
      id: 16,
      question_id: '4b566874-112b-462a-abbc-17cceaf34e9c',
      question: "How do you feel emotionally, today?",
      category: "Personal",
      section: 'User',
      user_id: '73b8bb71-c339-4029-bc70-6204928aa77b'
    },
    {
      id: 17,
      question_id: '6919550a-acca-478b-a890-0659ac50c839',
      question: "How do you feel physically, today?",
      category: "Personal",
      section: 'User',
      user_id: '73b8bb71-c339-4029-bc70-6204928aa77b'
    },
    {
      id: 18,
      question_id: '502bda90-984e-42b0-8673-8f35c838eaff',
      question: `How do you feel about your relationship with partner?`,
      category: 'Overall',
      section: 'User',
      user_id: '73b8bb71-c339-4029-bc70-6204928aa77b'
    },
    {
      id: 19,
      question_id: 'f7464320-6c7b-4654-a190-4f6f30395ba8',
      question: `How do you feel about your sex life with partner?`,
      category: 'Sex',
      section: 'User',
      user_id: '73b8bb71-c339-4029-bc70-6204928aa77b'
    },
    {
      id: 20,
      question_id: '04623f9d-d0d6-4f81-9d7b-336938edba51',
      question: `How do you feel about your emotional connection with partner?`,
      category: 'Friendship',
      section: 'User',
      user_id: '73b8bb71-c339-4029-bc70-6204928aa77b'
      
    }
  ]
}



function makeUserQuestions() {
  return [
    {
      id: 1,
      question_id: 'e773a595-5990-4678-a63c-9ea11f3df831',
      question: "How do you feel mentally, today?",
      category: "Personal",
      user_id: '73b8bb71-c339-4029-bc70-6204928aa77b'
    },
    {
      id: 2,
      question_id: '4b565474-112b-462a-abbc-17cceaf34e9c',
      question: "How do you feel emotionally, today?",
      category: "Personal",
      user_id: '73b8bb71-c339-4029-bc70-6204928aa77b'
    },
    {
      id: 3,
      question_id: '6918450a-acca-478b-a890-0659ac50c839',
      question: "How do you feel physically, today?",
      category: "Personal",
      user_id: '73b8bb71-c339-4029-bc70-6204928aa77b'
    },
    {
      id: 4,
      question_id: '502bda60-984e-42b0-8673-8f35c838eaff',
      question: `How do you feel about your relationship with partner?`,
      category: 'Overall',
      user_id: '73b8bb71-c339-4029-bc70-6204928aa77b'
    },
    {
      id: 5,
      question_id: 'f7464740-6c7b-4654-a190-4f6f30395ba8',
      question: `How do you feel about your sex life with partner?`,
      category: 'Sex',
      user_id: '73b8bb71-c339-4029-bc70-6204928aa77b'
    },
    {
      id: 6,
      question_id: '04684f9d-d0d6-4f81-9d7b-336938edba51',
      question: `How do you feel about your emotional connection with partner?`,
      category: 'Friendship',
      user_id: '73b8bb71-c339-4029-bc70-6204928aa77b'
      
    }

  ]
}

function makeFileUploads() {
  return [
    {
      "id" : 1,
      "entry_id" : "cbb7d0cd-3187-49b2-87b0-51898a6521bb",
      "file_name" : "cbb7d0cd-3187-49b2-87b0-51898a6521bb-a6qxon08a6m8dvgpkm1j_normal.jpeg",
      "file_path" : "uploads\/73b8bb71-c339-4029-bc70-6204928aa77b\/cbb7d0cd-3187-49b2-87b0-51898a6521bb-a6qxon08a6m8dvgpkm1j_normal.jpeg",
      "file_type" : "image\/jpeg",
      "user_id" : "73b8bb71-c339-4029-bc70-6204928aa77b",
      "date_created" : "2020-07-22T04:40:29Z"
    },
    {
      "id" : 2,
      "entry_id" : "4d35a449-0ba8-4e89-b841-5fdee5012c9d",
      "file_name" : "4d35a449-0ba8-4e89-b841-5fdee5012c9d-acWNy7VC_normal.jpeg",
      "file_path" : "uploads\/73b8bb71-c339-4029-bc70-6204928aa77b\/4d35a449-0ba8-4e89-b841-5fdee5012c9d-acWNy7VC_normal.jpeg",
      "file_type" : "image\/jpeg",
      "user_id" : "73b8bb71-c339-4029-bc70-6204928aa77b",
      "date_created" : "2020-07-22T04:40:29Z"
    },
    {
      "id" : 3,
      "entry_id" : "56ec49b8-7dea-4133-af5d-5d9ee8e7ce44",
      "file_name" : "56ec49b8-7dea-4133-af5d-5d9ee8e7ce44-1f44f.png",
      "file_path" : "uploads\/73b8bb71-c339-4029-bc70-6204928aa77b\/56ec49b8-7dea-4133-af5d-5d9ee8e7ce44-1f44f.png",
      "file_type" : "image\/png",
      "user_id" : "73b8bb71-c339-4029-bc70-6204928aa77b",
      "date_created" : "2020-07-22T04:40:58Z"
    },
    {
      "id" : 4,
      "entry_id" : "b1cb593a-2edc-47d3-9dd0-bb259203d45a",
      "file_name" : "b1cb593a-2edc-47d3-9dd0-bb259203d45a-ByJ3NcjCEAINEoP.png",
      "file_path" : "uploads\/73b8bb71-c339-4029-bc70-6204928aa77b\/b1cb593a-2edc-47d3-9dd0-bb259203d45a-ByJ3NcjCEAINEoP.png",
      "file_type" : "image\/png",
      "user_id" : "73b8bb71-c339-4029-bc70-6204928aa77b",
      "date_created" : "2020-07-22T04:40:58Z"
    },
    {
      "id" : 5,
      "entry_id" : "988af6d4-0665-4601-8b1d-3b7ae725ae02",
      "file_name" : "988af6d4-0665-4601-8b1d-3b7ae725ae02-ByJg8ZICYAAoT86.png",
      "file_path" : "uploads\/73b8bb71-c339-4029-bc70-6204928aa77b\/988af6d4-0665-4601-8b1d-3b7ae725ae02-ByJg8ZICYAAoT86.png",
      "file_type" : "image\/png",
      "user_id" : "73b8bb71-c339-4029-bc70-6204928aa77b",
      "date_created" : "2020-07-22T04:40:58Z"
    },
    {
      "id" : 6,
      "entry_id" : "19031af3-349b-4c77-ba4d-e52b3345b90e",
      "file_name" : "19031af3-349b-4c77-ba4d-e52b3345b90e-Cowboys Vs Titans 3rd Down Defense :Week 2 2014.mp4",
      "file_path" : "uploads\/73b8bb71-c339-4029-bc70-6204928aa77b\/19031af3-349b-4c77-ba4d-e52b3345b90e-Cowboys Vs Titans 3rd Down Defense :Week 2 2014.mp4",
      "file_type" : "video\/mp4",
      "user_id" : "73b8bb71-c339-4029-bc70-6204928aa77b",
      "date_created" : "2020-07-22T05:46:43Z"
    },
    {
      "id" : 7,
      "entry_id" : "009e10fd-a3dd-4b61-be55-b43d8476cd9c",
      "file_name" : "009e10fd-a3dd-4b61-be55-b43d8476cd9c-audioTest.m4a",
      "file_path" : "uploads\/73b8bb71-c339-4029-bc70-6204928aa77b\/009e10fd-a3dd-4b61-be55-b43d8476cd9c-audioTest.m4a",
      "file_type" : "audio\/mp4",
      "user_id" : "73b8bb71-c339-4029-bc70-6204928aa77b",
      "date_created" : "2020-07-22T07:52:39Z"
    }
      
  ]

}

function makeTestRelationships() {
  return [
    {
      id: 1,
      user_id: '73b8bb71-c339-4029-bc70-6204928aa77b',
      user_first_name: 'juan',
      user_last_name: 'baltazar',
      user_email: 'juan.baltazar1@gmail.com',
      partner_id: '13c0713a-ec31-4378-8aad-37a4c9f4a304',
      partner_first_name: 'megan',
      partner_last_name: 'baltazar',
      partner_email: 'meganlaurel17@gmail.com',
      anniversary: '2012-05-04T14:00:00.000Z'
    }
  ]
}

function makeQuestionAnswers() {
  return [
        {
          "id" : 1,
          "entry_id" : "0aa57a14-1e1a-44f8-aa2f-92f11d641d83",
          "user_id" : "73b8bb71-c339-4029-bc70-6204928aa77b",
          "question_id" : "e773a595-5990-4678-a63c-9ea11f3df831",
          "joy" : 100,
          "disgust" : 0,
          "sadness" : 0,
          "anger" : 0,
          "fear" : 0,
          "mood" : 100,
          "date_created" : "2020-07-31T05:00:56Z"
        },
        {
          "id" : 2,
          "entry_id" : "40ac5d26-4954-46e4-af0c-14b03d216167",
          "user_id" : "73b8bb71-c339-4029-bc70-6204928aa77b",
          "question_id" : "4b565474-112b-462a-abbc-17cceaf34e9c",
          "joy" : 100,
          "disgust" : 0,
          "sadness" : 0,
          "anger" : 0,
          "fear" : 0,
          "mood" : 100,
          "date_created" : "2020-07-31T05:00:56Z"
        },
        {
          "id" : 3,
          "entry_id" : "4994b03a-59a2-4319-9e00-359f1a385a8e",
          "user_id" : "73b8bb71-c339-4029-bc70-6204928aa77b",
          "question_id" : "6918450a-acca-478b-a890-0659ac50c839",
          "joy" : 100,
          "disgust" : 0,
          "sadness" : 0,
          "anger" : 0,
          "fear" : 0,
          "mood" : 100,
          "date_created" : "2020-07-31T05:00:57Z"
        },
        {
          "id" : 4,
          "entry_id" : "8971cf16-36af-4300-8dab-ff46cc1bae64",
          "user_id" : "73b8bb71-c339-4029-bc70-6204928aa77b",
          "question_id" : "b8dc039d-5438-4df6-828b-61418a1f70dd",
          "joy" : 100,
          "disgust" : 0,
          "sadness" : 0,
          "anger" : 0,
          "fear" : 0,
          "mood" : 100,
          "date_created" : "2020-07-31T05:00:59Z"
        },
        {
          "id" : 5,
          "entry_id" : "39f1e2c3-a47d-497d-bcb8-e085be9cae4f",
          "user_id" : "73b8bb71-c339-4029-bc70-6204928aa77b",
          "question_id" : "e773a595-5990-4678-a63c-9ea11f3df831",
          "joy" : 100,
          "disgust" : 0,
          "sadness" : 0,
          "anger" : 0,
          "fear" : 0,
          "mood" : 100,
          "date_created" : "2020-07-31T08:54:36Z"
        },
        {
          "id" : 6,
          "entry_id" : "1b50b107-07c4-46ff-8461-d616a893a116",
          "user_id" : "73b8bb71-c339-4029-bc70-6204928aa77b",
          "question_id" : "4b565474-112b-462a-abbc-17cceaf34e9c",
          "joy" : 100,
          "disgust" : 0,
          "sadness" : 0,
          "anger" : 0,
          "fear" : 0,
          "mood" : 100,
          "date_created" : "2020-07-31T08:54:37Z"
        },
        {
          "id" : 7,
          "entry_id" : "b85b13ad-b573-404d-a20e-7767b1a82f91",
          "user_id" : "73b8bb71-c339-4029-bc70-6204928aa77b",
          "question_id" : "6918450a-acca-478b-a890-0659ac50c839",
          "joy" : 100,
          "disgust" : 0,
          "sadness" : 0,
          "anger" : 0,
          "fear" : 0,
          "mood" : 100,
          "date_created" : "2020-07-31T08:54:38Z"
        },
        {
          "id" : 8,
          "entry_id" : "e333dbb6-9ae8-4b9d-9d2d-d932ae4e7b04",
          "user_id" : "73b8bb71-c339-4029-bc70-6204928aa77b",
          "question_id" : "b8dc039d-5438-4df6-828b-61418a1f70dd",
          "joy" : 100,
          "disgust" : 0,
          "sadness" : 0,
          "anger" : 0,
          "fear" : 0,
          "mood" : 100,
          "date_created" : "2020-07-31T08:54:40Z"
        },
        {
          "id" : 9,
          "entry_id" : "48082167-2c4e-4fe6-a0b9-bac72b4c6d63",
          "user_id" : "73b8bb71-c339-4029-bc70-6204928aa77b",
          "question_id" : "e773a595-5990-4678-a63c-9ea11f3df831",
          "joy" : 100,
          "disgust" : 0,
          "sadness" : 0,
          "anger" : 0,
          "fear" : 0,
          "mood" : 100,
          "date_created" : "2020-07-31T09:10:53Z"
        },
        {
          "id" : 10,
          "entry_id" : "7a76303d-4786-4b69-a0b7-9c508f0b8ca7",
          "user_id" : "73b8bb71-c339-4029-bc70-6204928aa77b",
          "question_id" : "4b565474-112b-462a-abbc-17cceaf34e9c",
          "joy" : 100,
          "disgust" : 0,
          "sadness" : 0,
          "anger" : 0,
          "fear" : 0,
          "mood" : 100,
          "date_created" : "2020-07-31T09:10:54Z"
        },
        {
          "id" : 11,
          "entry_id" : "050c415f-831f-4a2d-9d1f-839c7ce67fd9",
          "user_id" : "73b8bb71-c339-4029-bc70-6204928aa77b",
          "question_id" : "6918450a-acca-478b-a890-0659ac50c839",
          "joy" : 100,
          "disgust" : 0,
          "sadness" : 0,
          "anger" : 0,
          "fear" : 0,
          "mood" : 100,
          "date_created" : "2020-07-31T09:10:55Z"
        },
        {
          "id" : 12,
          "entry_id" : "d1edb1c8-c8c7-4e56-892b-625d164643c2",
          "user_id" : "73b8bb71-c339-4029-bc70-6204928aa77b",
          "question_id" : "b8dc039d-5438-4df6-828b-61418a1f70dd",
          "joy" : 100,
          "disgust" : 0,
          "sadness" : 0,
          "anger" : 0,
          "fear" : 0,
          "mood" : 100,
          "date_created" : "2020-07-31T09:10:57Z"
        },
        {
          "id" : 13,
          "entry_id" : "22986b86-4082-4c15-acd9-beffddc41beb",
          "user_id" : "73b8bb71-c339-4029-bc70-6204928aa77b",
          "question_id" : "e773a595-5990-4678-a63c-9ea11f3df831",
          "joy" : 70,
          "disgust" : 0,
          "sadness" : 30,
          "anger" : 0,
          "fear" : 0,
          "mood" : 100,
          "date_created" : "2020-08-05T04:16:15Z"
        },
        {
          "id" : 14,
          "entry_id" : "bebd9df0-3e52-4442-8d3c-71f037d967ce",
          "user_id" : "73b8bb71-c339-4029-bc70-6204928aa77b",
          "question_id" : "4b565474-112b-462a-abbc-17cceaf34e9c",
          "joy" : 70,
          "disgust" : 0,
          "sadness" : 30,
          "anger" : 0,
          "fear" : 0,
          "mood" : 100,
          "date_created" : "2020-08-05T04:16:23Z"
        },
        {
          "id" : 15,
          "entry_id" : "a1d8cf65-8020-47fd-be99-17ec8016325e",
          "user_id" : "73b8bb71-c339-4029-bc70-6204928aa77b",
          "question_id" : "6918450a-acca-478b-a890-0659ac50c839",
          "joy" : 90,
          "disgust" : 10,
          "sadness" : 0,
          "anger" : 0,
          "fear" : 0,
          "mood" : 80,
          "date_created" : "2020-08-05T04:17:14Z"
        },
        {
          "id" : 16,
          "entry_id" : "f90f56ca-388f-4cab-a495-5fd02dcbbf5c",
          "user_id" : "73b8bb71-c339-4029-bc70-6204928aa77b",
          "question_id" : "b8dc039d-5438-4df6-828b-61418a1f70dd",
          "joy" : 100,
          "disgust" : 0,
          "sadness" : 0,
          "anger" : 0,
          "fear" : 0,
          "mood" : 100,
          "date_created" : "2020-08-05T04:17:36Z"
        },
        {
          "id" : 17,
          "entry_id" : "63061828-d4d1-4449-93c4-8bc5030d1df8",
          "user_id" : "73b8bb71-c339-4029-bc70-6204928aa77b",
          "question_id" : "e773a595-5990-4678-a63c-9ea11f3df831",
          "joy" : 100,
          "disgust" : 0,
          "sadness" : 0,
          "anger" : 0,
          "fear" : 0,
          "mood" : 100,
          "date_created" : "2020-08-05T10:08:06Z"
        },
        {
          "id" : 18,
          "entry_id" : "4c013d85-0641-4767-bf2e-b89ce7c64c6e",
          "user_id" : "73b8bb71-c339-4029-bc70-6204928aa77b",
          "question_id" : "4b565474-112b-462a-abbc-17cceaf34e9c",
          "joy" : 100,
          "disgust" : 0,
          "sadness" : 0,
          "anger" : 0,
          "fear" : 0,
          "mood" : 100,
          "date_created" : "2020-08-05T10:10:05Z"
        },
        {
          "id" : 19,
          "entry_id" : "6ade8196-9784-46dd-bc44-368e9163996b",
          "user_id" : "73b8bb71-c339-4029-bc70-6204928aa77b",
          "question_id" : "6918450a-acca-478b-a890-0659ac50c839",
          "joy" : 100,
          "disgust" : 0,
          "sadness" : 0,
          "anger" : 0,
          "fear" : 0,
          "mood" : 100,
          "date_created" : "2020-08-05T10:10:06Z"
        },
        {
          "id" : 20,
          "entry_id" : "74d173ac-e67f-4df1-8817-c6fec7c4b2d6",
          "user_id" : "73b8bb71-c339-4029-bc70-6204928aa77b",
          "question_id" : "b8dc039d-5438-4df6-828b-61418a1f70dd",
          "joy" : 100,
          "disgust" : 0,
          "sadness" : 0,
          "anger" : 0,
          "fear" : 0,
          "mood" : 100,
          "date_created" : "2020-08-05T10:10:07Z"
        },
        {
          "id" : 21,
          "entry_id" : "f480befd-39a0-4abd-851f-d0d490372d5f",
          "user_id" : "73b8bb71-c339-4029-bc70-6204928aa77b",
          "question_id" : "e773a595-5990-4678-a63c-9ea11f3df831",
          "joy" : 100,
          "disgust" : 0,
          "sadness" : 0,
          "anger" : 0,
          "fear" : 0,
          "mood" : 100,
          "date_created" : "2020-08-05T10:33:35Z"
        },
        {
          "id" : 22,
          "entry_id" : "af54151d-19be-4c4b-8dd3-064827173e92",
          "user_id" : "73b8bb71-c339-4029-bc70-6204928aa77b",
          "question_id" : "4b565474-112b-462a-abbc-17cceaf34e9c",
          "joy" : 100,
          "disgust" : 0,
          "sadness" : 0,
          "anger" : 0,
          "fear" : 0,
          "mood" : 100,
          "date_created" : "2020-08-05T10:33:36Z"
        },
        {
          "id" : 23,
          "entry_id" : "6304383b-2247-4f9d-a8f8-77cb810f1c97",
          "user_id" : "73b8bb71-c339-4029-bc70-6204928aa77b",
          "question_id" : "6918450a-acca-478b-a890-0659ac50c839",
          "joy" : 100,
          "disgust" : 0,
          "sadness" : 0,
          "anger" : 0,
          "fear" : 0,
          "mood" : 100,
          "date_created" : "2020-08-05T10:33:37Z"
        },
        {
          "id" : 24,
          "entry_id" : "45f1a638-bf12-406c-8ba5-32a70dbd5642",
          "user_id" : "73b8bb71-c339-4029-bc70-6204928aa77b",
          "question_id" : "b8dc039d-5438-4df6-828b-61418a1f70dd",
          "joy" : 100,
          "disgust" : 0,
          "sadness" : 0,
          "anger" : 0,
          "fear" : 0,
          "mood" : 100,
          "date_created" : "2020-08-05T10:33:39Z"
        },
        {
          "id" : 25,
          "entry_id" : "b8dd0953-b4c6-4a84-a21c-dbdf089b33d7",
          "user_id" : "73b8bb71-c339-4029-bc70-6204928aa77b",
          "question_id" : "e773a595-5990-4678-a63c-9ea11f3df831",
          "joy" : 100,
          "disgust" : 0,
          "sadness" : 0,
          "anger" : 0,
          "fear" : 0,
          "mood" : 100,
          "date_created" : "2020-08-05T10:57:04Z"
        },
        {
          "id" : 26,
          "entry_id" : "86342458-ccee-417b-a992-5abe67ee876a",
          "user_id" : "73b8bb71-c339-4029-bc70-6204928aa77b",
          "question_id" : "4b565474-112b-462a-abbc-17cceaf34e9c",
          "joy" : 100,
          "disgust" : 0,
          "sadness" : 0,
          "anger" : 0,
          "fear" : 0,
          "mood" : 100,
          "date_created" : "2020-08-05T10:57:05Z"
        },
        {
          "id" : 27,
          "entry_id" : "a27ec0bc-78d0-468c-8fa6-532b8265fe40",
          "user_id" : "73b8bb71-c339-4029-bc70-6204928aa77b",
          "question_id" : "6918450a-acca-478b-a890-0659ac50c839",
          "joy" : 100,
          "disgust" : 0,
          "sadness" : 0,
          "anger" : 0,
          "fear" : 0,
          "mood" : 100,
          "date_created" : "2020-08-05T10:57:05Z"
        },
        {
          "id" : 28,
          "entry_id" : "8ab175d3-6a44-4248-abc9-7d5e6e642455",
          "user_id" : "73b8bb71-c339-4029-bc70-6204928aa77b",
          "question_id" : "b8dc039d-5438-4df6-828b-61418a1f70dd",
          "joy" : 100,
          "disgust" : 0,
          "sadness" : 0,
          "anger" : 0,
          "fear" : 0,
          "mood" : 100,
          "date_created" : "2020-08-05T10:57:07Z"
        },
        {
          "id" : 29,
          "entry_id" : "9a772fc8-45dc-4335-82d4-cc632a982974",
          "user_id" : "73b8bb71-c339-4029-bc70-6204928aa77b",
          "question_id" : "e773a595-5990-4678-a63c-9ea11f3df831",
          "joy" : 100,
          "disgust" : 0,
          "sadness" : 0,
          "anger" : 0,
          "fear" : 0,
          "mood" : 100,
          "date_created" : "2020-08-05T11:07:58Z"
        },
        {
          "id" : 30,
          "entry_id" : "9feb133e-5071-4f36-8665-18a627bfcee9",
          "user_id" : "73b8bb71-c339-4029-bc70-6204928aa77b",
          "question_id" : "4b565474-112b-462a-abbc-17cceaf34e9c",
          "joy" : 100,
          "disgust" : 0,
          "sadness" : 0,
          "anger" : 0,
          "fear" : 0,
          "mood" : 100,
          "date_created" : "2020-08-05T11:07:58Z"
        },
        {
          "id" : 31,
          "entry_id" : "c4445b44-02b4-4e87-902d-0ec2a233d3fe",
          "user_id" : "73b8bb71-c339-4029-bc70-6204928aa77b",
          "question_id" : "6918450a-acca-478b-a890-0659ac50c839",
          "joy" : 100,
          "disgust" : 0,
          "sadness" : 0,
          "anger" : 0,
          "fear" : 0,
          "mood" : 100,
          "date_created" : "2020-08-05T11:07:59Z"
        },
        {
          "id" : 32,
          "entry_id" : "a57d8891-8a58-4d95-ba5d-36da6f4d3c04",
          "user_id" : "73b8bb71-c339-4029-bc70-6204928aa77b",
          "question_id" : "b8dc039d-5438-4df6-828b-61418a1f70dd",
          "joy" : 100,
          "disgust" : 0,
          "sadness" : 0,
          "anger" : 0,
          "fear" : 0,
          "mood" : 100,
          "date_created" : "2020-08-05T11:08:00Z"
        },
        {
          "id" : 33,
          "entry_id" : "d176e504-fdb6-447e-aac6-e50767ff79da",
          "user_id" : "73b8bb71-c339-4029-bc70-6204928aa77b",
          "question_id" : "e773a595-5990-4678-a63c-9ea11f3df831",
          "joy" : 100,
          "disgust" : 0,
          "sadness" : 0,
          "anger" : 0,
          "fear" : 0,
          "mood" : 100,
          "date_created" : "2020-08-06T05:18:33Z"
        },
        {
          "id" : 34,
          "entry_id" : "ca634fef-6354-4978-91e0-545a176a7e65",
          "user_id" : "73b8bb71-c339-4029-bc70-6204928aa77b",
          "question_id" : "4b565474-112b-462a-abbc-17cceaf34e9c",
          "joy" : 100,
          "disgust" : 0,
          "sadness" : 0,
          "anger" : 0,
          "fear" : 0,
          "mood" : 100,
          "date_created" : "2020-08-06T05:18:34Z"
        },
        {
          "id" : 35,
          "entry_id" : "e30dc5cc-283e-4388-98c1-d23dcc7b23df",
          "user_id" : "73b8bb71-c339-4029-bc70-6204928aa77b",
          "question_id" : "6918450a-acca-478b-a890-0659ac50c839",
          "joy" : 100,
          "disgust" : 0,
          "sadness" : 0,
          "anger" : 0,
          "fear" : 0,
          "mood" : 100,
          "date_created" : "2020-08-06T05:18:35Z"
        },
        {
          "id" : 36,
          "entry_id" : "42e86b4d-bf25-4291-ab34-6fcef342ace1",
          "user_id" : "73b8bb71-c339-4029-bc70-6204928aa77b",
          "question_id" : "b8dc039d-5438-4df6-828b-61418a1f70dd",
          "joy" : 100,
          "disgust" : 0,
          "sadness" : 0,
          "anger" : 0,
          "fear" : 0,
          "mood" : 100,
          "date_created" : "2020-08-06T05:18:37Z"
        },
        {
          "id" : 37,
          "entry_id" : "7ed657d6-9cac-4979-a479-d7348665e880",
          "user_id" : "73b8bb71-c339-4029-bc70-6204928aa77b",
          "question_id" : "e773a595-5990-4678-a63c-9ea11f3df831",
          "joy" : 100,
          "disgust" : 0,
          "sadness" : 0,
          "anger" : 0,
          "fear" : 0,
          "mood" : 100,
          "date_created" : "2020-08-06T07:21:31Z"
        },
        {
          "id" : 38,
          "entry_id" : "2e3700ee-574e-47be-9140-5514857bb47c",
          "user_id" : "73b8bb71-c339-4029-bc70-6204928aa77b",
          "question_id" : "4b565474-112b-462a-abbc-17cceaf34e9c",
          "joy" : 100,
          "disgust" : 0,
          "sadness" : 0,
          "anger" : 0,
          "fear" : 0,
          "mood" : 100,
          "date_created" : "2020-08-06T07:21:32Z"
        },
        {
          "id" : 39,
          "entry_id" : "7dd034fc-94cc-44b3-985d-b549072837c1",
          "user_id" : "73b8bb71-c339-4029-bc70-6204928aa77b",
          "question_id" : "6918450a-acca-478b-a890-0659ac50c839",
          "joy" : 100,
          "disgust" : 0,
          "sadness" : 0,
          "anger" : 0,
          "fear" : 0,
          "mood" : 100,
          "date_created" : "2020-08-06T07:21:33Z"
        },
        {
          "id" : 40,
          "entry_id" : "6fe6f7aa-cd79-4378-80c3-f3bfc5153319",
          "user_id" : "73b8bb71-c339-4029-bc70-6204928aa77b",
          "question_id" : "b8dc039d-5438-4df6-828b-61418a1f70dd",
          "joy" : 100,
          "disgust" : 0,
          "sadness" : 0,
          "anger" : 0,
          "fear" : 0,
          "mood" : 100,
          "date_created" : "2020-08-06T07:21:34Z"
        },
        {
          "id" : 41,
          "entry_id" : "2237e2fc-a0c0-4a17-93a7-210af3ee4a86",
          "user_id" : "73b8bb71-c339-4029-bc70-6204928aa77b",
          "question_id" : "e773a595-5990-4678-a63c-9ea11f3df831",
          "joy" : 100,
          "disgust" : 0,
          "sadness" : 0,
          "anger" : 0,
          "fear" : 0,
          "mood" : 100,
          "date_created" : "2020-08-07T06:05:43Z"
        },
        {
          "id" : 42,
          "entry_id" : "07ccd0e4-a7f5-4d4d-bf48-f85fab644cf9",
          "user_id" : "73b8bb71-c339-4029-bc70-6204928aa77b",
          "question_id" : "4b565474-112b-462a-abbc-17cceaf34e9c",
          "joy" : 100,
          "disgust" : 0,
          "sadness" : 0,
          "anger" : 0,
          "fear" : 0,
          "mood" : 100,
          "date_created" : "2020-08-07T06:05:44Z"
        },
        {
          "id" : 43,
          "entry_id" : "9221a9bd-1bdd-4283-8a03-bdfc2b588d91",
          "user_id" : "73b8bb71-c339-4029-bc70-6204928aa77b",
          "question_id" : "6918450a-acca-478b-a890-0659ac50c839",
          "joy" : 100,
          "disgust" : 0,
          "sadness" : 0,
          "anger" : 0,
          "fear" : 0,
          "mood" : 100,
          "date_created" : "2020-08-07T06:05:45Z"
        },
        {
          "id" : 44,
          "entry_id" : "48344be8-88c8-46d8-9927-1b0e1fee2584",
          "user_id" : "73b8bb71-c339-4029-bc70-6204928aa77b",
          "question_id" : "b8dc039d-5438-4df6-828b-61418a1f70dd",
          "joy" : 100,
          "disgust" : 0,
          "sadness" : 0,
          "anger" : 0,
          "fear" : 0,
          "mood" : 100,
          "date_created" : "2020-08-07T06:05:46Z"
        },
        {
          "id" : 45,
          "entry_id" : "c9000737-5390-4511-a579-e8ac64ea5585",
          "user_id" : "73b8bb71-c339-4029-bc70-6204928aa77b",
          "question_id" : "502bda60-984e-42b0-8673-8f35c838eaff",
          "joy" : 100,
          "disgust" : 0,
          "sadness" : 0,
          "anger" : 0,
          "fear" : 0,
          "mood" : 100,
          "date_created" : "2020-08-07T06:18:27Z"
        },
        {
          "id" : 46,
          "entry_id" : "5abdb350-bbf4-476f-a2d6-c044be657bd5",
          "user_id" : "73b8bb71-c339-4029-bc70-6204928aa77b",
          "question_id" : "f7464740-6c7b-4654-a190-4f6f30395ba8",
          "joy" : 100,
          "disgust" : 0,
          "sadness" : 0,
          "anger" : 0,
          "fear" : 0,
          "mood" : 100,
          "date_created" : "2020-08-07T06:18:28Z"
        },
        {
          "id" : 47,
          "entry_id" : "b3272826-ae93-435b-8b9f-db172362315b",
          "user_id" : "73b8bb71-c339-4029-bc70-6204928aa77b",
          "question_id" : "04684f9d-d0d6-4f81-9d7b-336938edba51",
          "joy" : 100,
          "disgust" : 0,
          "sadness" : 0,
          "anger" : 0,
          "fear" : 0,
          "mood" : 100,
          "date_created" : "2020-08-07T06:18:28Z"
        },
        {
          "id" : 48,
          "entry_id" : "49ead7ee-e968-4955-98ed-5f356192340c",
          "user_id" : "73b8bb71-c339-4029-bc70-6204928aa77b",
          "question_id" : "6379ee97-a00e-4c31-9cc6-d28469a06f4b",
          "joy" : 100,
          "disgust" : 0,
          "sadness" : 0,
          "anger" : 0,
          "fear" : 0,
          "mood" : 100,
          "date_created" : "2020-08-07T06:18:29Z"
        },
        {
          "id" : 49,
          "entry_id" : "fd8f98d2-b1cd-4d9e-861b-4883328958ec",
          "user_id" : "73b8bb71-c339-4029-bc70-6204928aa77b",
          "question_id" : "ca925037-2b20-4d7d-ac41-f3b22452b385",
          "joy" : 100,
          "disgust" : 0,
          "sadness" : 0,
          "anger" : 0,
          "fear" : 0,
          "mood" : 100,
          "date_created" : "2020-08-07T06:18:30Z"
        },
        {
          "id" : 50,
          "entry_id" : "24dfd3d8-5c71-43e3-8d25-b3e156e6b9a1",
          "user_id" : "73b8bb71-c339-4029-bc70-6204928aa77b",
          "question_id" : "84d2cf7e-8bf7-43cd-97c9-2f1e44f961a2",
          "joy" : 100,
          "disgust" : 0,
          "sadness" : 0,
          "anger" : 0,
          "fear" : 0,
          "mood" : 100,
          "date_created" : "2020-08-07T06:18:32Z"
        },
        {
          "id" : 51,
          "entry_id" : "0de8ae05-4358-4026-9470-4a0b7c346ddb",
          "user_id" : "73b8bb71-c339-4029-bc70-6204928aa77b",
          "question_id" : "dbb7564d-3a31-4fec-90fa-2f4e9401ab7b",
          "joy" : 100,
          "disgust" : 0,
          "sadness" : 0,
          "anger" : 0,
          "fear" : 0,
          "mood" : 100,
          "date_created" : "2020-08-07T06:18:33Z"
        },
        {
          "id" : 52,
          "entry_id" : "5f5290c9-4182-4667-b97c-12514665124f",
          "user_id" : "73b8bb71-c339-4029-bc70-6204928aa77b",
          "question_id" : "b67382bb-ce5a-4585-a748-3085e30b7c45",
          "joy" : 100,
          "disgust" : 0,
          "sadness" : 0,
          "anger" : 0,
          "fear" : 0,
          "mood" : 100,
          "date_created" : "2020-08-07T06:18:34Z"
        },
        {
          "id" : 53,
          "entry_id" : "d676f670-bca8-473d-b227-8832a91324d7",
          "user_id" : "73b8bb71-c339-4029-bc70-6204928aa77b",
          "question_id" : "6775cc23-9349-4f79-8f70-6d4d1f655cf5",
          "joy" : 100,
          "disgust" : 0,
          "sadness" : 0,
          "anger" : 0,
          "fear" : 0,
          "mood" : 100,
          "date_created" : "2020-08-07T06:18:35Z"
        },
        {
          "id" : 54,
          "entry_id" : "b40f400e-dfc4-4492-aef9-8a517798a01d",
          "user_id" : "73b8bb71-c339-4029-bc70-6204928aa77b",
          "question_id" : "2e6f62f6-a780-4315-995a-0c2f2809e830",
          "joy" : 100,
          "disgust" : 0,
          "sadness" : 0,
          "anger" : 0,
          "fear" : 0,
          "mood" : 100,
          "date_created" : "2020-08-07T06:18:36Z"
        }
  ]
}

function retrieveData() {
  const testUsers = makeUsersArray()
  const textEntries = makeTextEntries()
  const genQuestions = makeGenQuestions()
  const userQuestions = makeUserQuestions()
  const fileUploads = makeFileUploads()
  const testRelationships = makeTestRelationships()
  const testAnswers = makeQuestionAnswers()

  return {
    testUsers,
    textEntries,
    genQuestions,
    userQuestions,
    fileUploads,
    testRelationships,
    testAnswers
  }
}

function cleanTables(db) {
  return db.transaction(trx =>
    trx.raw(
      `TRUNCATE
        tqm_users,
        tqm_text_entries,
        tqm_file_uploads,
        tqm_questionaire,
        tqm_gen_questions,
        tqm_relationship_request,
        tqm_user_relationship
      `
    )
    .then(() =>
      Promise.all([
        trx.raw(`ALTER SEQUENCE tqm_users_id_seq minvalue 0 START WITH 1`),
        trx.raw(`ALTER SEQUENCE tqm_text_entries_id_seq minvalue 0 START WITH 1`),
        trx.raw(`ALTER SEQUENCE tqm_file_uploads_id_seq minvalue 0 START WITH 1`),
        trx.raw(`ALTER SEQUENCE tqm_questionaire_id_seq minvalue 0 START WITH 1`),
        trx.raw(`ALTER SEQUENCE tqm_gen_questions_id_seq minvalue 0 START WITH 1`),
        trx.raw(`ALTER SEQUENCE tqm_relationship_request_id_seq minvalue 0 START WITH 1`),
        trx.raw(`ALTER SEQUENCE tqm_user_relationship_id_seq minvalue 0 START WITH 1`),
        trx.raw(`SELECT setval('tqm_users_id_seq', 0)`),
        trx.raw(`SELECT setval('tqm_text_entries_id_seq', 0)`),
        trx.raw(`SELECT setval('tqm_file_uploads_id_seq', 0)`),
        trx.raw(`SELECT setval('tqm_questionaire_id_seq', 0)`),
        trx.raw(`SELECT setval('tqm_gen_questions_id_seq', 0)`),
        trx.raw(`SELECT setval('tqm_relationship_request_id_seq', 0)`),
        trx.raw(`SELECT setval('tqm_user_relationship_id_seq', 0)`),
      ])
    )
  )
}

function seedUsers(db, users) {
  const preppedUsers = users.map(user => ({
    ...user,
    password: bcrypt.hashSync(user.password, 1)
  }))
  
  return db.into('tqm_users').insert(preppedUsers)
    .then(() =>
    db.raw(
      `SELECT setval('tqm_users_id_seq', ?)`,
      [users[users.length-1].id],
    )
  )
}

function seedTextTables(db, textEntries) {
  return db
    .into('tqm_text_entries')
    .insert(textEntries)
    .then(() => 
      db.raw(
        `SELECT setval('tqm_text_entries_id_seq', ?)`,
        [textEntries[textEntries.length -1].id],
      )
    )

}

function seedGenQuestions(db, genQuestions) {
  return db
    .into('tqm_gen_questions')
    .insert(genQuestions)
    .then(() =>
      db.raw(
        `SELECT setval('tqm_gen_questions_id_seq', ?)`,
        [genQuestions[genQuestions.length -1].id],
      )
    )
}

function seedUserQuestions(db, userQuestions) {
  return db
    .into('tqm_user_questions')
    .insert(userQuestions)
    .then(() =>
      db.raw(
        `SELECT setval('tqm_user_questions_id_seq', ?)`,
        [userQuestions[userQuestions.length -1].id],
      )
    )
}

function seedFileUploads(db, fileUploads) {
  return db
    .into('tqm_file_uploads')
    .insert(fileUploads)
    .then(() => {
      db.raw(
        `SELECT setval('tqm_file_uploads_id_seq', ?)`,
        [fileUploads[fileUploads.length -1].id],
      )
    })
}

function seedRelationshipReq(db, testRelationships) {
  return db
    .into('tqm_relationship_request')
    .insert(testRelationships)
    .then(() => {
      db.raw(
        `SELECT setval('tqm_relationship_request_id_seq', ?)`,
        [testRelationships[testRelationships.length -1].id],
      )
    })
}

function seedQuestionAnswers(db, testAnswers) {
  return db
    .into('tqm_questionaire')
    .insert(testAnswers)
    .then(() => {
      db.raw(
        `SELECT setval('tqm_questionaire_id_seq', ?)`,
        [testAnswers[testAnswers.length -1].id],
      )
    })
}
function makeAuthHeader(user, secret = process.env.JWT_SECRET) {
  const token = jwt.sign(
    {user_id: user.user_id},
    secret,
    {subject: user.email,
    algorithm: 'HS256'}
  )

  return `Bearer ${token}`
}



module.exports = {
  retrieveData,
  cleanTables,
  seedUsers,
  seedTextTables,
  makeAuthHeader,
  seedGenQuestions,
  seedUserQuestions,
  seedFileUploads,
  seedRelationshipReq,
  seedQuestionAnswers
}