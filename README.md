# APP TABLE

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 17.1.1.

## Development server

Run `server:start` to start json-server. The server will automatically restart if you change db.json file.
Run `ng serve` for a dev server. Navigate to `http://localhost:4400/`. The application will automatically reload if you change any of the source files.

## Конфиг таблицы.
Конфиг внедряется через DI в компонент таблицы. TABLE_CONFIG token. Используется интерфейс ITableConfig. В конфиге можно задать следующие параметры:
* autoLoading: boolean - автоматическая загрузка данных при инициализации таблицы. По умолчанию true.
* id: number - уникальный идентификатор таблицы. По умолчанию случайное число от 0 до 1000.
* props: Record<string, string | number | boolean> - дополнительные параметры запроса для получения списка сущностей. По умолчанию пустой объект.
* messageNotFound: string – текст сообщения, если данные не найдены. По умолчанию не задано.
* messagePending: string – текст сообщения, когда данные загружаются. По умолчанию не задано.
* header: string – название таблицы (заголовок). По умолчанию не задано.

## События.
Таблица поддерживает следующие события:
* onClickByRowEvent: ClickByRowEventInterface – Пользователь кликнул (выбрал) строку в таблице.
* onEmptyEvent: EmptyEventInterface – Ответ от сервера был получен, но в ответе нет данных. Ничего не найдено.
* onUpdatedEvent: UpdatedEventInterface – Ответ от сервера был получен, в ответе есть данные.
* onErrorEvent: ErrorEventInterface – Ответ от сервера не был получен, ошибка HTTP.

## Необходимые сервисы.
Для работы таблицы необходимо внедрить следующие сервисы:
* TableApiFacade – сервис для получения данных с сервера (фасад). API_FACADE token. Необходимо реализовать интерфейс BaseApiFacade.
* TableApiService – сервис для получения данных с сервера (слой маппинга). API_SERVICE token. Необходимо реализовать интерфейс BaseApiService.
* TableEntitiesStoreService – сервис для хранения данных. STORE_SERVICE token. Необходимо реализовать интерфейс BaseEntitiesStoreService.

## Тулбар.
Тулбар передаётся в компонент таблицы через ng-content (проекция контента).

## Загрузка состояния.
Состояние таблицы представляет собой класс, который содержит следующие поля (angular signals):
* pageModel: PageModel – модель пагинации.
* sortModel: SortModel – модель сортировки.
* searchTerm: string – строка поиска.
* params: Record<string, string | number | boolean> – дополнительные параметры запроса для получения списка сущностей. Передаются в таблицу через конфиг.
* pageEntities Array<ENTITY_TYPE> – массив сущностей.

!Данные не хранятся в url страницы!
!Библиотека использует ui компоненты из ng-zorro!
