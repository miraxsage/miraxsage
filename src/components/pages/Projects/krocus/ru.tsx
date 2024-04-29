import { ProjectContent, ProjectContentProps, ProjectContentImage, ProjectContentImageProps } from "../ProjectContent";

function Image({ img, side }: Omit<ProjectContentImageProps, "slug">) {
    return <ProjectContentImage slug="krocus" side={side} img={img} />;
}

export function Component({ onImageClick }: ProjectContentProps) {
    return (
        <ProjectContent onImageClick={onImageClick}>
            <br />
            <p>
                <Image img={1} />
                Сайт сети автозаправочных станций «Крокус» в основном имеет информационный характер, однако после его
                запуска впоследствии по просьбе заказчика в него дополнительно была интегрирована онлайн система
                топливных карт, позволяющая импортировать информацию о составе, владельцах топливных карт, расходу
                топлива и прочих характеристиках из учетной программы 1С, предоставляя пользователям доступ к данной
                информации посредством личного кабинета.
            </p>
            <p>
                <Image side="right" img={3} />
                Актуализация информации по топливным картам по согласованию с заказчиком выполняется сотрудниками путем
                выгрузки из 1С специализированного отчета и его загрузки на сайте, где актуальные остатки сравниваются с
                текущими на сайте, по обнаруженным расхождениям добавляются новые карты, пользователи, операции списания
                и поступления.
            </p>
            <p>
                <Image img={4} />
                Клиент с активной топливной картой после авторизации имеет возможность зайти в соответствующий раздел
                сайта и посмотреть информацию по каждой из своих своей топливных карт, в частности сколько единиц
                топлива предоставляемых компанией в данный момент числится у него на балансе.
            </p>
            <p>
                Разработка велась на базе CMS Wordpress, а также с использованим библиотеки JQuery, JQuery UI и
                собственной стилизацией соответственно оформлению фирменного стиля компании.
            </p>
        </ProjectContent>
    );
}