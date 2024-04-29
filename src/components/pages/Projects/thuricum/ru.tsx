import { ProjectContent, ProjectContentProps, ProjectContentImage, ProjectContentImageProps } from "../ProjectContent";

function Image({ img, side }: Omit<ProjectContentImageProps, "slug">) {
    return <ProjectContentImage slug="thuricum" side={side} img={img} />;
}

export function Component({ onImageClick }: ProjectContentProps) {
    return (
        <ProjectContent onImageClick={onImageClick}>
            <br />
            <p>
                <Image img={1} />
                Главная страница демонстрирует привлекательный лендинг, демонстрирующий ключевые возможности и
                достижения организации, историю становления, данные для обратной связи.
            </p>
            <p>
                <Image side="right" img={5} />
                Сайт ориентирован на широкую аудиторию, учитывая популярность организации и количество существующих
                клиентов, мобильная версия с таким же удобством позволяет получить ту же информацию и услуги из любого
                раздела сайта, а версия на иностранном языке также не оставляет без внимания англоязычных резидентов.
                Более того на сайте представлена базовая реализация версии для слабовидящих, демонстрирующая открытость
                и приветливость компании для любых своих клиентов.
            </p>
            <p>
                <Image img={7} />
                Однако информационная составляющая – не единственный предаваемый клиентам сервис, на сайте присутствует
                ряд разделов, имеющих динамическое содержимое, позволяющее пользователям выполнить некоторое
                предварительное обслуживание. Например, раздел калькуляторов стоимости услуг использует на серверной
                стороне набор excel-файлов, обновляемых и наполняемых сотрудниками организации из учетных программ. С их
                помощью выполняется построение страницы калькулятора, представленной в виде анкеты, в зависимости от
                выпора первых вопросов отображаются соответствующие следующие с выпадающими списками, вариантами выбора
                из указанных файлов excel. В итоге по результату заполнения финальный PHP-скрипт высчитывает
                результирующую рекомендованную страховую премию на основе табличных данных, представленной пользователем
                информации, актуальных данных курсов валют с сайта Центробанка.
            </p>
            <p>
                <Image img={9} />
                Другой раздел «Реестр брокеров и агентов» также предлагает пользователям некоторый интерактивный
                интерфейс, позволяющий выполнять поиск по динамически обновляемому реестру записей в формате .csv,
                загружаемому сотрудниками организации.
            </p>
            <div style={{ clear: "both" }}></div>
        </ProjectContent>
    );
}
