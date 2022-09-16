## 삽질의 시작

```
복잡도를 잘 관리해서 유지보수의 비용을 낮게 유지할 수 있는 소프트웨어를 만들고 싶다.
-> 복잡도를 늘리는 행위를 강하게 제한하는 엄격한 룰을 가지는 리액트 프로젝트를 만들고싶다.
-> 안드로이드도 UI를 만든다는 동일한 목표를 엄격한 룰을 지키면서 이루어내는 것 같다.
-> 따라해보자 (strict 한 룰을 따르면서 개발해보자!)
```

## UI 소프트웨어를 구축하는 안드로이드 아키텍쳐 이해하고 따라해보자.

클린 아키텍쳐 / 안드로이드 앱 아키텍쳐 / 95학번 데릭의 인사이트를 짬뽕했다.

클린 아키텍쳐에서 차용할 수 있는 부분은 좀 제너럴한 아이디어.
소프트웨어의 구성요소들의 의존관계를 변화가 잦은 쪽이 변화가 덜한 쪽에 의존하는 형태로 짜여야한다는 것.

안드로이드 공식문서의 앱 아키텍쳐도 이러한 큰 아이디어의 틀을 벗어나지 않는다..
UI 어플리케이션을 3가지 구성요소로 나누고 왼 -> 오 방향으로 의존하게 한다. UI -> 도메인 -> 데이터.

그리고 회식자리에서 데주워들은 릭 옹의 인사이트도 굉장히 인상적이었다.

> MVC니 MVVM이니 왜 정해두냐, 결국 어떤 틀을 만들어두고, 네이밍이나 코드를 위치시킬때의 고민을 줄여주기 위함이다.

이런걸 마구 섞어서 룰을 만들어보자.

## 무슨무슨 아키텍쳐

UI 어플리케이션의 3 계층을 그대로 가져오자.

- 데이터 ( 레포지토리 )
  => 데이터를 관리하는 영역. 서버에 요청하든, 로컬에서 만들어내든, rq를 쓰든 recoil을 쓰든 아무튼 데이터를 관리하는 영역.
- 도메인 ( 서비스 )
  => 클라이언트 사이드 비즈니스 로직. 데이터 계층에서 받아온 데이터를 필요한 형태로 가공.
- UI
  => 화면을 그려주는 영역. UI 로직 정도만 가져야하고, 도메인 or 데이터 계층에서 받아온 데이터를 그려주기만 함.

위 => 아래로 내려갈수록 변화가 자주 일어날 수 있다. 위 쪽 계층은 아래쪽 계층을 모르는 형태가 되어야함.

### | 데이터 ( repository )

데이터를 읽고 업데이트하는 영역.

실제로 데이터를 만들고, 업데이트하는 ( 서버나 어딘가 외부에 요청해서 상태를 바꾸고 가져오는 ) entity 영역.
rq or recoil 등 레포지토리에 접근하는 repository 영역.

```ts
// src/data/doctor/doctor.api.ts
type DoctorDto = {
  id: number;
  name: string;
  bookmarked: boolean;
};

type GetDoctorsApiRequest = {
  type: SomeGetDoctorType;
};

type GetDoctorsApiResponse = AxiosResponse<{
  result: { doctors: Array<DoctorDto>; total: number };
}>;

const getDoctorsApi = (request: GetDoctorsApiRequest): GetDoctorApiResponse => {
  return axios.get('/doctors', request);
};

type BookmakrDoctorApiRequest = {
  id: number;
};

type BookmarkDoctorApiResponse = AxiosResponse<{
  success: boolean;
}>;

const bookmarkDoctorApi = (
  request: BookmarkDoctorApiRequest
): BookmarkDoctorApiResponse => {
  return axios.post('/doctors', request);
};

const DoctorApi = {
  getDoctorsApi,
  bookmarkDoctorApi
};

export default DoctorApi;
```

```tsx
// src/data/doctor/doctor.repository.tsx
// rq 를 쓰던 recoil을 쓰던 아무튼.
type UseDoctorsParams = {
  form: { type: SomeGetDoctorType };
};

type UseDoctorsResult = {
  doctors: Array<DoctorDto>;
  total: number;
};

const useDoctors = (params: UseDoctorParams) => {
  const { form: getDoctorApiRequest } = params;
  return useQuery(DOCTOR_KEY.DOCTORS, () =>
    DoctorApi.getDoctorsApi(getDoctorApiRequest)
  );
};

type UseBookmarkDoctorMutationParams = {
  form: { id: number };
};

type UseBookmarkDoctorMutationResult = {
  success: boolean;
};

const useBookmarkDoctorMutation = (params: UseBookmarkDoctorMutationParams) => {
  const { form: bookmarkDoctorRequest } = params;
  return useQuery(DOCTOR_KEY.DOCTORS, () =>
    DoctorApi.bookmarkDoctorApi(bookmarkDoctorRequest)
  );
};

const DoctorQuery = {
  useDoctors,
  useBookmarkDoctorMutation
};

export default DoctorQuery;
```

### | 도메인 ( service )

```ts
// src/domain/doctor/doctor.service.ts
interface DoctorEntity extends DoctorDto {
  displayName: string;
}

const toEntity = (doctorDto: DoctorDto) => {
  return { ...doctorDto, displayName: doctor.name + ' 선생님' };
};

const bookmark = (doctorDto: DoctorEntity) => {
  return { ...doctorDto, bookmarked: true };
};

const DoctorService = {
  toVo,
  bookmark
};
```

> Todo: DoctorService.bookmark 내부에서 쿼리 캐시에 접근해서 데이터를 직접 바꾸는 방법도 있을 것 같다. useMutation은 repository를 통하지 않는 것으로...
> 더 나아가면 useQuery도 DoctorService.fecthDoctors로 퉁쳐버릴수도? 근데 위험할 것 같은게, 결국 optimistic 한 업데이트니까, 실제 서버에서 바뀐 데이터와 다를 수도 있음.

### | UI ( presntation )

UI 영역은 Screen과 component 로 나눈다. Screen에서 데이터 or 도메인 레이어에서 데이터를 가져와서, 아래쪽 컴포넌트에 내려준다.

```tsx
const SomeScreen = () => {
  const { data } = DoctorQuery.useDoctors({
    select: DoctorService.toEntity
  });
  const { mutate } = DoctorQuery.useBookmarkDoctorMutation({
    onMutate: DoctorService.bookmark
    // 이녀석은 optional 합니다. 서버 상태와 클라이언트 상태를 병렬적으로 관리하게될 경우가 많지는 않아보여요.
    // ( api 결과 기다리지 않고 좋아요 처리한다던가... 그런 경우에 국한될 것 같아요. )
  });

  return (
    <Fragment>
      <SomeComponent data={data} />
      <SomeComponent onPress={mutate} />
      <SomeComponent />
    </Fragment>
  );
};
```

<!-- ### ~~~UI 소프트웨어를 구축하는 안드로이드 아키텍쳐 이해하고 따라해보자.~~~

클린 아키텍쳐에서 차용할 수 있는 부분은 좀 제너럴한 아이디어.
소프트웨어의 구성요소들의 의존관계를 변화가 잦은 쪽이 변화가 덜한 쪽에 의존하는 형태로 구축하는 것.

안드로이드 공식문서의 앱 아키텍쳐도 이러한 큰 아이디어의 틀을 벗어나지 않는다.
앱을 3가지 구성요소로 나누고 위에서 아래의 방향으로 의존하게 한다.

- refs
  - [클린 아키텍쳐](https://blog.cleancoder.com/uncle-bob/2012/08/13/the-clean-architecture.html)
  - [안드로이드 앱 아키텍쳐](https://developer.android.com/topic/architecture?hl=ko)
  - [안드로이드 DI w MVVM](https://doitddo.tistory.com/94?category=855312) -->

<!-- ```bash
# src/
apis/ # 서버에 보내는 요청들. req body, response 타입 까지 관할.
respositories/ # 서버에서 받아온 데이터를 저장해두는 곳. rq? recoil
servicies/ # 파싱...? 클라이언트 사이드에 필요한 비즈니스 로직?
components/ # 헤드리스 컴포넌트 데이터 주입만 하면 되는 놈들.

```

페이지 레벨에서 데이터 주입해주기 vs 컴포넌트 레벨에서 데이터 가져와 사용하기

DI?

- 어떤 객체가 의존하는 다른 객체를, 외부에서 주입해주는 것.
- 이것으로 얻을 수 있는건...

## refs
- https://doitddo.tistory.com/128?category=855312
- image.png
 -->

```

```
