# iconv

UTF-8이 아닌 `*.java` 파일들을 UTF-8 인코딩으로 고쳐주는 아주 간단한 유틸로 월패드 빌드 자동화 시에 간단히 필요하여 휘리릭 작성하였다.

## Usage

```
$ yarn convert <directory>
```

Should work on both a Mac and Windows (as well as linux of course) since all the dependencies are in pure javascript e.g. [iconv-lite](https://github.com/ashtuchkin/iconv-lite).

That's it.
