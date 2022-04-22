FROM directus/directus:9.9.0

WORKDIR /directus

RUN mkdir -p snapshots

VOLUME /directus/snapshots

COPY ./snapshots/booking-start.yaml /directus/snapshots

COPY ./extensions/ /directus/extensions

EXPOSE 8055

CMD \
  npx directus bootstrap && \
  npx directus schema apply --yes ./snapshots/booking-start.yaml && \
  npx directus start