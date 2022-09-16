## 무슨무슨 아키텍쳐

안드로이드 앱 아키텍쳐를 따라서 UI 어플리케이션의 3 계층을 그대로 가져오자.

- 데이터
  => 데이터를 관리하는 영역. 서버에 요청하든, 로컬에서 만들어내든, rq를 쓰든 recoil을 쓰든 아무튼 데이터를 관리하는 영역.
- 도메인
  => 클라이언트 사이드 비즈니스 로직. 데이터 계층에서 받아온 데이터를 필요한 형태로 가공.
- UI
  => 화면을 그려주는 영역. UI 로직 정도만 가져야하고, 도메인 or 데이터 계층에서 받아온 데이터를 그려주기만 함.

위 => 아래로 내려갈수록 변화가 자주 일어날 수 있다. 위 쪽 계층은 아래쪽 계층을 모르는 형태가 되어야한다.

### | 데이터

데이터를 관리하는 영역.

```bash
src/data/post/post.api.ts
# api. 여기서 서버에서 받아오는 데이터를 Dto 포스트픽스를 붙여 정의한다.
# function getPostsApi
# type GetPostsApiResponse, type GetPostsApiResponse, type PostDto
src/data/post/post.repository.tsx
# repository. 클라이언트 런타임의 영속성 레이어라고 생각하면 될듯. api를 쏘든 뭐 아무튼 다른걸 하든 해서 데이터를 만들고, rq를 쓰든, recoil을 쓰든 해서 데이터를 들고있는 곳.
# function usePosts
# Type UsePostsParams, Type UsePostsResult

# repository => api 방향으로 의존
```

### | 도메인

비즈니스 로직?을 담는 부분. 일단은 Dto를 뷰모델로 컨버팅하는 로직 정도가 떠오름. optimistic update 를 위한 로직도 있을 수 있을 것 같은데.... 아직 어지럽다.

```bash
src/domain/post/post.service.ts
# 클라이언트에서 바라보는 뷰모델 타입을 정의하고, Dto를 뷰모델로 컨버팅하는 로직 작성
# function PostService.parse, function PostService.parseArray
# type Post

# domain => data 방향으로 의존
```

### | UI

UI 영역은 page와 component 로 이루어짐. page 에서는 domain, data 레이어를 통해 데이터에 접근, 해당 데이터를 component 에 주입해서 화면을 그려줌.

```bash
src/page/somepage/index.tsx
# 페이지. domain과 data 레이어에서 받아온 데이터와 컴포넌트를 조합해서 화면을 구성함.
src/page/somePage/components/SomeComponent.tsx
# 페이지에서 쓰이는, 데이터를 알고있는 컴포넌트. props로 뷰모델을 받아서 알아서 그려주는 컴포넌트.
src/components/SomeComponent/index.tsx
# 데이터를 모르는 헤드리스 컴포넌트. UI 스테이트외에 상태를 가지지 않는 녀석들.
```

## Todo

우선은 지금 사용중인 형태를 구조화하는데에 그쳐서 좀 불편한 부분이 있음...

repository 쪽에서 query client나 recoil state tree에 직접 접근하는 방식으로 데이터를 다루는 인터페이스를 만들어서 노출시키면

service 쪽이 좀 더 service 스러워지지 않을까 싶다. ui 는 service에만 직접적으로 의존하는 형태로.
