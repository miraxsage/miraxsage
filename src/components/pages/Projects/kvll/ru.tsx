import { ProjectContent, ProjectContentProps, ProjectContentImage, ProjectContentImageProps } from "../ProjectContent";

function Image({ img, side }: Omit<ProjectContentImageProps, "slug">) {
    return <ProjectContentImage slug="kvll" side={side} img={img} />;
}

export function Component({ onImageClick }: ProjectContentProps) {
    return (
        <ProjectContent onImageClick={onImageClick}>
            <br />
            <p>
                KvartAll – крупный портал предлагающий услуги размещения и поиска объявлений о недвижимости в первую
                очередь в Краснодарском крае и Краснодаре.
            </p>
            <p>
                <Image img={1} />
                Несмотря на то, что разработка портала велась всего тремя разработчиками по различным направлениям с
                горизонтом планирования около 12 месяцев, результатом явилось большое и серьезное успешное коммерческое
                решение, в настоящее время активно продолжающее свое существование, привлечение и обслуживание
                пользователей.
            </p>
            <p>
                В качестве платформы для разработки был выбран фреймворк Yii2, его система авторизации, базовые сервисы
                защиты вроде CSRF и т.д. Также был использован ряд вспомогательных библиотек и сервисов для формирования
                excel-документов, отображения pdf-документов, отображения интерактивных табулированных данных в
                административной части, API Яндекс карт для отображения данных локализации, КЛАДР API для управления
                адресами и некоторые другие. В свою очередь вся бизнес-логика, пользовательский интерфейс,
                административная часть были разработаны полностью самостоятельно, что с учетом общего объема функционала
                делает данных проект одним из самых больших.
            </p>
            <p>
                <Image img={2} />
                Посещая KvartAll вы обнаружите для себя приятный глазу доступный дизайн, позволяющий вам интуитивно
                перемещаться между разделами сайта, выполнять поиск объявлений, читать статьи, выполнить регистрацию и
                авторизацию, посетить личный кабинет и создать собственной объявление, оплатить его и отслеживать
                состояние и многое другое.
            </p>
            <p>
                <Image side="right" img={16} />
                Очевидно, такой масштабный проект имеет систему ролей и прав пользователей: администраторы, менеджеры,
                застройщики, риэлторы, обычные пользователи. Управляя сайтом, администрация располагает целым набором
                объектов и действующих лиц – это агентства недвижимости и связанных с ними риэлторы, застройщики и их
                представители, каждый из которых обладает личной страницей с отражением их описания, их объявлений и
                комментариев. Риэлторы и застройщики могут управлять своим агентством, объектом строительства, жилым
                комплексом, новостройкой из личного кабинета.
            </p>
            <p>
                <Image side="right" img={7} />
                Вместе с тем одним из центральных компонентов сайта является модуль поиска, представляющий собой
                компонент с богатым набором критериев фильтрации и сортировки среди перечисленных различных объектов
                портала – объявлений, новостроек, агентств, застройщиков и т.д. Результаты поиска мы можем отображать
                как в виде списка, так и в виде отдельных точек на карте.
            </p>
            <p>
                <Image img={9} />
                Портал также содержит два информационных раздела – со статьями и новостями, где администрация может
                создавать новый записи, назначать им теги и категории, управлять комментариями, добавлять ссылки на
                социальные сети, такие разделы добавляют еще один элемент привлечения новый пользователей –
                специализированный новостной и информационный ресурс.
            </p>
            <p>
                <Image side="right" img={18} />
                Монетизация услуг портала доступна за счет введения широкого спектра услуг, оказываемых при размещении
                объявления, возможности выделять его цветом, держать вверху списка поиска и т.д. Система оплаты
                полностью автоматизирована посредством использования сервиса приема онлайн платежей Robokassa.
            </p>
            <p>
                <Image img={17} /> Всеми описанными функциями и возможностями можно управлять как из личного кабинета,
                обладающего в зависимости от роли пользователя соответствующим функционалом, так и из панели
                администратора, позволяющей добиться полного контроля над модерацией объявлений и комментариев,
                транзакциями оплаты, обработкой заявок и обратной связью, управления статьями и объявлениями,
                пользователями и объектами, агентствами и застройщиками, рекламными баннерами, осуществлять, в общем,
                полный контроль.
            </p>
        </ProjectContent>
    );
}
