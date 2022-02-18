FROM directus/directus:9.5.0

WORKDIR /directus

RUN mkdir -p snapshots

VOLUME /directus/snapshots

EXPOSE 8055

CMD \
  npx directus bootstrap && \
  npx directus schema apply --yes ./snapshots/booking-start.yaml && \
  npx directus start