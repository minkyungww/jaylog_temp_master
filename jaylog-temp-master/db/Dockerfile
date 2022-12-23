# 도커 허브에서 이미지를 가져와서 이미지를 작업한다
# FROM (이미지 이름:버전)
FROM mariadb

# 컨테이너 실행 전 작동할 명령
# RUN (명령)
# 타임존 설정 (설정을 하지 않으면 시간 저장시 다른 시간대로 저장됨)
RUN ln -snf /usr/share/zoneinfo/Asia/Seoul /etc/localtime
RUN echo Asia/Seoul > /etc/timezone

# 이미지 내부 환경 설정
# ENV (타겟) (내용)
ENV MYSQL_USER testuser
ENV MYSQL_PASSWORD !skfkzldna123
ENV MYSQL_ROOT_PASSWORD !skfkzldna123