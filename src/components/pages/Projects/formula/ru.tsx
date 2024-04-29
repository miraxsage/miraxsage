import { ProjectContent, ProjectContentProps, ProjectContentImage, ProjectContentImageProps } from "../ProjectContent";

function Image({ img, side }: Omit<ProjectContentImageProps, "slug">) {
    return <ProjectContentImage slug="formula" side={side} img={img} />;
}

export function Component({ onImageClick }: ProjectContentProps) {
    return (
        <ProjectContent onImageClick={onImageClick}>
            <br />
            <p>
                <Image img={1} />
                Сайт клиники предлагает обновленный современный интерфейс, привлекающий внимание мягкими цветами и
                формами, имеет адаптированную мобильную версию, версию для слабовидящих. Конечно, основным направлением
                деятельности сайта является информационное сопровождение клиентов, подробная и исчерпывающая информация
                об оказываемых услугах, персонале, актуальном прайсе.
            </p>
            <p>
                <Image side="right" img={4} />
                Обычное информационное наполнение для большинства страниц сайта является интересным и привлекательным,
                однако с точки зрения особенностей разработки не представляет особенной сложности. Сайт клиники,
                разработанный на CMS Wordpress является рядовым решением в области проектов прикладного сервиса, интерес
                представляет раздел прайс-листа, предлагающий особенный функционал информирования о ценообразовании.
            </p>
            <p>
                <Image img={8} />
                Часто на сайтах рядовых клиник или прочих организаций массового сервиса нельзя найти информацию об
                актуальных ценах – их сложно постоянно обновлять и держать несколько тысяч позиций в актуальном
                состоянии. Мы совместно с администрацией клиники «Формула здоровья» пошли дальше и решили разработать
                собственный модуль (плагин) Wordpress, позволяющий легко и просто импортировать данную информацию из
                учетных программ, а также Excel-файлов.
            </p>
            <p>
                <Image side="right" img={11} />
                Решение начинается с панели администратора. Здесь сотрудник организации может формировать общую
                структуру прайс-листа вручную, а также пользоваться режимом импорта, загружая информацию из внешнего
                файла, указывая диапазон поиска и после предварительного просмотра загружать информацию на сайт. Более
                того прайс-лист может иметь вложенную иерархическую структуру, что позволяет организовывать категории,
                раздели и подразделы для более удобного представления и навигации для пользователей.
            </p>
            <p>
                <Image img={9} />
                На клиентской стороне по сформированной структуре с множеством записей формирует подробную структуру, по
                которой пользователь может осуществлять эффективный и быстрый поиск не смотря на большой объем записей,
                хранение и динамический доступ к данным прайс-листа, их обновление были тщательно продуманы, благодаря
                чему не наблюдается заметных задержек ни на мобильном устройстве, ни на компьютере.
            </p>
            <div style={{ clear: "both" }}></div>
        </ProjectContent>
    );
}