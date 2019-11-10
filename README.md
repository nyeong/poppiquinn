# PoppiQuinn

<https://www.op.gg/summoner/champions/userName=우이동%20뽀삐퀸>

가톨릭대학교 가알람 백엔드 서버

## DB Scheme

### User

```
{
  phone: string,
  name: string,
  nickname: string,
  youPhone: User
}
```

## API

### GET '/user'

전체 유저 정보를 확인할 수 있습니다.

결과:

```
{
    "ok": "",
    "users": [
        {
            "__v": 0,
            "_id": "5dc7b203ffd66c979e699d57",
            "name": "annyeong",
            "nickname": "안녕",
            "phone": "01000000000",
            "youPhone": "01000000000"
        },
        {
            "__v": 0,
            "_id": "5dc7b2cb5f67d7e3a70be79d",
            "name": "eukaliptus",
            "nickname": "역곡동타우킹",
            "phone": "01000000000",
            "youPhone": "01000000000"
        }
    ]
}
```

### POST `/user/info`

입력:

```
{
  phone: string, // 내 번호
  name: string,
  nickname: string,
  youPhone: string, // 좋아하는 사람의 번호
}
```

출력:

```
{
    "ok": "user saved",
    "user": {
        "__v": 0,
        "_id": "5dc7b2cb5f67d7e3a70be79d",
        "name": "eukaliptus",
        "nickname": "역곡동타우킹",
        "phone": "01000000000",
        "youPhone": "01000000000"
    }
}
```
