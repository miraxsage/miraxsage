export const js = `import { AnyObject, isAnyObject } from "@/types/common";

export default function deepMerge(obj1: unknown, obj2: unknown): AnyObject | null {
    if (!isAnyObject(obj1)) {
        if (!isAnyObject(obj2)) return null;
        else return obj2;
    } else {
        if (!isAnyObject(obj2)) return obj1;
        const obj: AnyObject = { ...obj1 };
        for (const prop in obj2) {
            if (prop in obj && typeof obj[prop] == "object" && typeof obj2[prop] == "object")
                obj[prop] = deepMerge(obj[prop], obj2[prop]);
            else obj[prop] = obj2[prop];
        }
        return obj;
    }
}
export function areEqualShallow(a: unknown, b: unknown) {
    if (!isAnyObject(a) || !isAnyObject(b)) return a === b;
    for (const key in a) {
        if (!(key in b) || a[key] !== b[key]) {
            return false;
        }
    }
    for (const key in b) {
        if (!(key in a)) {
            return false;
        }
    }
    return true;
}
const debounceIds: { id: string; timerId: NodeJS.Timeout | null; time: number; delay: number }[] = [];
export function debounce(id: string, handler: () => void, delay: number = 100, immidiateLaunch: boolean = false) {
    const dToken = debounceIds.find(({ id: dId }) => dId == id);
    if (dToken) {
        if (dToken.timerId) clearTimeout(dToken.timerId);
        if (Date.now() - dToken.time > delay) {
            dToken.time = Date.now();
            dToken.delay = delay;
            handler();
        } else {
            dToken.delay = delay;
            setTimeout(handler, delay - (Date.now() - dToken.time));
        }
    } else {
        if (immidiateLaunch) handler();
        debounceIds.push({ id, timerId: immidiateLaunch ? null : setTimeout(handler, delay), time: Date.now(), delay });
    }
}
`;

export const ts = `export type AnyObject = { [k: string]: unknown };

export function isAnyObject(arg: unknown): arg is AnyObject {
    return typeof arg == "object";
}

export type AddTypeToField<T extends object, K extends keyof T, U> = {
    [Key in keyof T]: Key extends K ? T[Key] | U : T[Key];
};

export type PartialFields<T extends object, U extends keyof T> = {
    [K in U]?: T[K];
} & {
    [K in keyof T as K extends U ? never : K]: T[K];
};

export type FlagsObjectFromUnion<T extends string> = {
    [K in T]: boolean;
};

export type AtLeastOneImportantFieldFromGiven<
    T extends object,
    K1 extends keyof T,
    K2 extends keyof T = K1
> = K1 extends unknown
    ? { [Key in K1]: T[Key] } & {
          [Key in K2 as Key extends K1 ? never : Key]?: T[Key];
      } & {
          [Key in keyof T as Key extends K1 ? never : Key extends K2 ? never : Key]: T[Key];
      }
    : never;

export type AnyInnerFieldType<T extends object, K = keyof T> = K extends keyof T
    ? T[K] extends object
        ? T[K] | AnyInnerFieldType<T[K]>
        : T[K]
    : never;

export type TypeOrItsAnyInnerField<T> = T extends object ? T | AnyInnerFieldType<T> : T;

type UnionToIntersection<U> = (U extends unknown ? (k: U) => void : never) extends (k: infer I) => void ? I : never;
type LastOf<T> = UnionToIntersection<T extends unknown ? () => T : never> extends () => infer R ? R : never;
export type AllUnionStringCombinations<
    T extends string,
    T2 = LastOf<T>,
    T3 = T extends T2 ? true : false
> = T3 extends true
    ? T2
    :
     | AllUnionStringCombinations<Exclude<T, T2>>
     | \`\${AllUnionStringCombinations<Exclude<T, T2>> & string}-\${T2 & string}\`;
`;

export const react = `import "../style.css";
import "@/utilities/cookie";
import { SxProps, useMediaQuery, useTheme } from "@mui/material";
import MainLayout from "./layout/MainLayout";
import { useThemeColor } from "./contexts/Theme";
import { useAsideMenuVisibility, useLanguage, useScreenMode, useViewMode } from "@/store/appearanceSlice";
import { ReactContentProps } from "@/types/react";
import { Link, Outlet, RouterProvider, createBrowserRouter } from "react-router-dom";
import { Link as MuiLink } from "@mui/material";
import { AppSpinner } from "./Spinners";
import React, { useEffect, useRef } from "react";
import { Provider } from "react-redux";
import ThemeContext from "./contexts/ThemeContext";
import store from "@/store";
import Landing from "./pages/Landing";
import OverlapedChildrenContainer from "./OverlapedChildrenContainer";

function AppLayout({ children, sx }: { sx?: SxProps } & ReactContentProps) {
    return (
        <OverlapedChildrenContainer
            sx={{
                background: useThemeColor("pageBg"),
                minHeight: "calc(max(500px, 100dvh))",
                height: 0,
                ...sx,
            }}
        >
            {children}
        </OverlapedChildrenContainer>
    );
}

const router = createBrowserRouter([
    {
        path: "/",
        element: (
            <MainLayout>
                <Outlet />
            </MainLayout>
        ),
        errorElement: (
            <div>
                404 Page not found <br /> Let\`s go
                <Link to="/">
                    <MuiLink>home</MuiLink>
                </Link>
            </div>
        ),
        children: [
            {
                path: "/",
                element: <Landing />,
            },
            {
                path: "about/:category?/:block?",
                lazy: async () => {
                    const { default: Component } = await import("@/components/pages/About/index.tsx");
                    return { Component };
                },
            },
            {
                path: "projects",
                lazy: async () => {
                    const { default: Component } = await import("@/components/pages/Projects/index.tsx");
                    return { Component };
                },
            },
            {
                path: \`projects/:slug\`,
                lazy: () => import(\`@/components/pages/Projects/ProjectPage.tsx\`),
            },
            {
                path: "interact",
                lazy: async () => {
                    const { default: Component } = await import("@/components/pages/Contacts/index.tsx");
                    return { Component };
                },
            },
        ],
    },
]);

export function App() {
    return (
        <React.StrictMode>
            <Provider store={store}>
                <ThemeContext>
                    <AppContent />
                </ThemeContext>
            </Provider>
        </React.StrictMode>
    );
}

function AppContent() {
    useLanguage();
    const theme = useTheme();
    const sm = useMediaQuery(theme.breakpoints.down("md"));
    const asideMenuVisibility = useAsideMenuVisibility();
    const screenMode = useScreenMode();
    const viewMode = useViewMode();
    const appearanceBeforeSmallScreen = useRef({
        asideMenuVisibility: asideMenuVisibility.value,
        screenMode: screenMode.value,
        viewMode: viewMode.value,
    });
    useEffect(() => {
        if (sm) {
            appearanceBeforeSmallScreen.current.asideMenuVisibility = asideMenuVisibility.value;
            appearanceBeforeSmallScreen.current.screenMode = screenMode.value;
            appearanceBeforeSmallScreen.current.viewMode = viewMode.value;
        }
        asideMenuVisibility.update(sm ? "collapsed" : appearanceBeforeSmallScreen.current.asideMenuVisibility);
        screenMode.update(sm ? "full" : appearanceBeforeSmallScreen.current.screenMode);
        viewMode.update(sm ? "desktop" : appearanceBeforeSmallScreen.current.viewMode);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [sm]);
    return (
        <AppLayout>
            <RouterProvider router={router} fallbackElement={<AppSpinner />} />
        </AppLayout>
    );
}

export default App;
`;
export const php = `<?php
function str_replace_first($haystack, $needle, $replace, &$changed = false){
    $changed = false;
    $pos = mb_strpos($haystack, $needle);
    if ($pos !== false) {
        $changed = true;
        return mb_substr_replace($haystack, $replace, $pos, strlen($needle));
    }
    return $haystack;
}
function mb_substr_replace($original, $replacement, $position, $length)
{
    $startString = mb_substr($original, 0, $position, "UTF-8");
    $endString = mb_substr($original, $position + $length, mb_strlen($original), "UTF-8");

    $out = $startString . $replacement . $endString;

    return $out;
}
function arr_has($arr, $key, $val = null){
    if(empty($arr) || !is_array($arr) || empty($key) || !key_exists($key, $arr))
        return false;
    if($val == null)
        return true;
    if($val === true && !empty($arr[$key]))
        return true;
    return $arr[$key] == $val;
}
function declention($num, $var0, $var1, $var2){
    $num = floatval($num);
    if(round($num / 10.0, 0) == 1 || $num % 10 == 0)
        return $var0;
    elseif($num % 10 == 1)
        return $var1;
    elseif(($num % 10 >= 2) && ($num % 10 <= 4))
        return $var2;
    return $var0;
}
function extract_margin($margin_raw){
    if(empty($margin_raw))
        return null;
    if(preg_match("/^(-?\\d+(\\.\\d+)?|-) (-?\\d+(\\.\\d+)?|-) (-?\\d+(\\.\\d+)?|-) (-?\\d+(\\.\\d+)?|-)$/", $margin_raw) !== 1)
        return null;
    $els = explode(" ", $margin_raw);
    $res = "";
    $props = ["top", "right", "bottom", "left"];
    for($i = 0; $i < 4; $i++){
        if($els[$i] == "-")
            continue;
        $res .= "margin-".$props[$i].":".$els[$i]."px;";
    }
    if(empty($res))
        return null;
    return substr($res, 0, strlen($res) - 1);
}
`;
export const wp = `<?php
function wa_queried_target($non_stardart_check = true){
    if(is_archive() || ($non_stardart_check && !empty($GLOBALS["wa_is_archive_template_render"])))
        return "archive";
    $qobj = wa_queried_object();
    if($qobj instanceof WP_Post){
        if(get_post_type($qobj->ID) == "page")
            return "page";
        else
            return "record";
    }
    return "";
}
function wa_queried_object(){
    $obj = get_queried_object();
    if(!empty($obj))
        return $obj;
    global $pagenow;
    global $post;
    if(in_array($pagenow, array('post.php', 'post-new.php')))
        return $post;
    return null;
}
function wa_is_single(){
    $target = wa_queried_target();
    return $target == "page" || $target == "record";
}
function wa_is_page(){
    return wa_queried_target() == "page";
}
function wa_is_record(){
    return wa_queried_target() == "record";
}
function wa_is_archive($common = true){
    return wa_queried_target($common) == "archive";
}
$is_archive = wa_is_archive();
$is_record = false;
$is_page = false;
if(is_single()) {
    $qobj = get_queried_object();
    if($qobj instanceof WP_Post){
        if(get_post_type($qobj->ID) == "page")
            $is_page = true;
        else
            $is_record = true;
    }
}
function similar_posts($post_id){
    if(empty($post_id))
        return [];
    if($post_id instanceof WP_Post){
        $post = $post_id;
        $post_id = $post->ID;
    }
    else
        $post = get_post($post_id);
    global $wpdb;
    $cats = wp_get_post_categories($post_id);
    $tags_objs = wp_get_post_tags($post_id);
    $tags = [];
    foreach ($tags_objs as $tobj)
        $tags[] = $tobj->term_id;
    $terms_ids = join(",", [...$cats, ...$tags]);
    if(empty($terms_ids))
        $terms_ids = "-1";
    preg_match_all("/[a-zа-я0-9]+/ui", $post->post_title, $matches, PREG_SET_ORDER);
    $rel_cond = "";
    foreach($matches as $m) {
        if(mb_strlen($m[0]) > 2)
            $rel_cond .= (empty($rel_cond) ? "" : " + ") . "(case when post_title like '%$m[0]%' then 1 else 0 end)";
    }
    if(empty($rel_cond))
        $rel_cond = "0";
    $similars = $wpdb->get_results(sprintf('select * from
    (
        select 
            p.id, 
            p.relevance, 
            sum(case when rel.object_id is not null then 1 else 0 end) as terms_relevance
        from 
        (
            select id,
                   %s as relevance	
            from '.$wpdb->posts.'
                where post_type = "%s" and ID <> %s
    
        ) as p
        left join '.$wpdb->term_relationships.' as rel
            on rel.object_id = p.id and rel.term_taxonomy_id in (%s) 
        group by p.id, p.relevance
    ) as q
    where q.relevance > 0 or q.terms_relevance > 0
    order by q.relevance desc, q.terms_relevance desc, q.id desc
    limit 0, 3', $rel_cond, $post->post_type, $post_id, $terms_ids));
    if(empty($similars))
        return [];
    $ids = [];
    foreach ($similars as $s)
        $ids[] = $s->id;
    return get_posts(['post__in' => $ids]);
}
`;
export const mysql = `$query = "";
if($owner != null && $owner_id != null)
{
	$this->layout = 'main';
	$data = ['owner' => $owner, 'sort' => $sort, 'adv_type' => $adv_type, 'obj_type' => $obj_type, 'owner_id' => $owner_id];
	switch($owner)
	{
		case 'realtor':
		$query = "from ".\\App::AdvsTable()." advert_full left join address adr on adr.id = advert_full.address_id where status = 'active' and ended_at >= unix_timestamp() and owner_id = ".$owner_id." and (select status from user where user.id = ".$owner_id." limit 0, 1) = 10";
			break;
		case 'user':
			$query = "from ".\\App::AdvsTable()." advert_full left join address adr on adr.id = advert_full.address_id where status = 'active' and ended_at >= unix_timestamp() and owner_id = ".$owner_id." and (select status from user where user.id = ".$owner_id." limit 0, 1) = 10";
			break;
		case 'agency':
			$query = "from ".\\App::AdvsTable()." advert_full left join address adr on adr.id = advert_full.address_id where status = 'active' and ended_at >= unix_timestamp() and (select org_id from employee where (select count(*) from admin where admin.user_id = employee.user_id) = 0 and employee.user_id = advert_full.owner_id and employee.position <= 3 limit 0,1) = ".$owner_id." and (select user.status from user where user.id = advert_full.owner_id limit 0, 1) = 10";
			break;
		case 'company':
			$query = "from ".\\App::AdvsTable()." advert_full left join address adr on adr.id = advert_full.address_id where status = 'active' and ended_at >= unix_timestamp() and (select org_id from employee where (select count(*) from admin where admin.user_id = employee.user_id) = 0 and employee.user_id = advert_full.owner_id and employee.position <= 3 limit 0,1) = ".$owner_id." and (select user.status from user where user.id = advert_full.owner_id limit 0, 1) = 10";
			break;
		case 'high_rise':
			$query = "from ".\\App::AdvsTable()." advert_full left join address adr on adr.id = advert_full.address_id where status = 'active' and ended_at >= unix_timestamp() and object = 'high_rise_object' and object_id = ".$owner_id." and (select user.status from user where user.id = advert_full.owner_id limit 0, 1) = 10";
			break;
		case 'cottage':
			$query = "from ".\\App::AdvsTable()." advert_full left join address adr on adr.id = advert_full.address_id where status = 'active' and ended_at >= unix_timestamp() and object = 'cottage_object' and object_id = ".$owner_id." and (select user.status from user where user.id = advert_full.owner_id limit 0, 1) = 10";
			break;
		case 'commerce':
			$query = "from ".\\App::AdvsTable()." advert_full left join address adr on adr.id = advert_full.address_id where status = 'active' and ended_at >= unix_timestamp() and object = 'commerce_object' and object_id = ".$owner_id." and (select user.status from user where user.id = advert_full.owner_id limit 0, 1) = 10";
			break;
	}
	$q_wadv = "select distinct count(*) ".$query.($obj_type != null ? " and obj_type = '".preg_replace("/house/", "home", preg_replace("/s$/", "", preg_replace("/businesses$/", "businesss", $obj_type)))."'" : "");
	$q_wobj = "select distinct count(*) ".$query.($adv_type != null ? " and adv_type = '".$adv_type."'" : "");
	$query .=
		($obj_type != null ? " and obj_type = '".preg_replace("/house/", "home", preg_replace("/s$/", "", preg_replace("/businesses$/", "businesss", $obj_type)))."'" : "").
		($adv_type != null ? " and adv_type = '".$adv_type."'" : "");
	$data['adverts_count'] = \\App::qScalar("select distinct count(*) ".$query);
$data['pages'] = new \\yii\\data\\Pagination(['totalCount' => $data['adverts_count'], 'pageSize' => isset($get['per-page']) ? ($get['per-page'] == 'all' ? $data['adverts_count'] : $get['per-page']) : 5]);
	$data['adverts'] = \\App::qAll("
			select distinct advert_full.*, adr.city, adr.street, adr.building, adr.city_region,
			case when advert_full.express_ended_at > unix_timestamp() then
				case when unix_timestamp(cast(concat(date(from_unixtime(unix_timestamp())), \\" \\", time(from_unixtime(advert_full.express_ended_at))) as datetime)) > unix_timestamp() then
					unix_timestamp(cast(concat(date(from_unixtime(unix_timestamp() - 86400)), \\" \\", time(from_unixtime(advert_full.express_ended_at))) as datetime))
				else
					unix_timestamp(cast(concat(date(from_unixtime(unix_timestamp())), \\" \\", time(from_unixtime(advert_full.express_ended_at))) as datetime))
				end
			else greatest(ifnull(advert_full.raised_at, 0), advert_full.created_at)
			end sort_date
			".$query." ".($sort > 0 ?
			($sort == 1 ? " order by advert_full.created_at desc" :
				($sort == 2 ? " order by price asc" :
					($sort == 3 ? " order by price desc" :
						($sort == 4 ? " order by m2_price asc" :
							($sort == 5 ? " order by m2_price desc" : " order by sort_date desc"))))) : " order by sort_date desc")
		." limit ".$data['pages']->offset.",".$data['pages']->limit);
	
		
	$data['q_wadv'] = $q_wadv;
	$data['q_wobj'] = $q_wobj;
	\\App::$viewMode = "frame";
	return $this->render('personal_adverts', $data);
}

$city = null;
$region = null;
$regionid = null;
$kladr_obj = null;
...
$view = null;
if($obj_type == null)
	$obj_type = 'apartments';
if($obj_type == 'rooms' || $obj_type == 'apartments' || $obj_type == 'houses' || $obj_type == 'estates' || $obj_type == 'placements' || $obj_type == 'buildings' || $obj_type == 'garages' || $obj_type == 'areas' || $obj_type == 'businesses')
{
	if(!isset($adv_type) || ($adv_type != 'sale' && $adv_type != 'buy' && $adv_type != 'rent' && $adv_type != 'hire'))
		$adv_type = 'sale';
	if($obj_type == 'estates')
	{
		$view = $adv_type.'_'.$obj_type;
		if(isset($_GET['sa']) && isset($_GET['sa']['type']))
		{
			switch($_GET['sa']['type'])
			{
				case 'Помещение': $obj_type = 'placements'; break;
				case 'Здание': $obj_type = 'buildings'; break;
				case 'Гараж': $obj_type = 'garages'; break;
				case 'Земельный участок': $obj_type = 'areas'; break;
				case 'Бизнес': $obj_type = 'businesses'; break;
			}
		}
	}
	else
		$view = $adv_type.'_'.($obj_type == 'placements' || $obj_type == 'buildings' || $obj_type == 'garages' || $obj_type == 'areas' || $obj_type == 'businesses' ? 'estates' : $obj_type);
}
else
{
	$view = $obj_type;
	$adv_type = null;
}
$sort = 0;
if(isset($_GET['sort']))
	$sort = intval($_GET['sort']);
$model = null;
$pages = null;
$data = ['adv_type' => $adv_type, 'obj_type' => $obj_type, 'sort' => $sort];
switch($obj_type)
{
	case 'realtors':
		$model = new \\frontend\\models\\search\\sg();
		$this->setAddress($model, $city, $cityid, $region, $regionid);
		$this->setPrice($model, $price_from, $price_to);
		$model->load($_GET);

		$realtors = null;
		$realtors_count = 0;

		$query = preg_replace("/( |\\n|\\r)*(and|where)( |\\n|\\r)*$/", "", "
		from user
			left join address
				on address.id = user.address_id
			left join employee
				on employee.user_id = user.id
			left join organization
				on organization.id = employee.org_id
		where
			user.status = 10 and
			(user.usertype = 1 or user.usertype = 2) and
			".($model->name != null && strlen($model->name) > 0 ? $this->whereName($model->name, "user.name") : "")."
			".($model->orgname != null && strlen($model->orgname) > 0 ? $this->whereName($model->orgname, "organization.name") : "")."
			".($model->region_id != null && strlen($model->region_id) > 1 ? "address.region_id = ".$model->region_id." and " : "")."
			".$this->whereCity($model)."

		");

		$realtors_count = \\App::qScalar("select distinct count(*) ".$query);
		$pages = new \\yii\\data\\Pagination(['totalCount' => $realtors_count, 'pageSize' => max(1, isset($get['per-page']) ? $get['per-page'] == 'all' ? $realtors_count : $get['per-page'] : 6)]);
		$realtors = \\App::qAll("select distinct
			user.*,
			rand(".$rand.") as r,
			user.name as username,
			user.id as userid,
			employee.*,
			organization.name as orgname,
			organization.id as orgid,
			(select count(*) from advert where status = 'active' and ended_at >= unix_timestamp() and owner_id = user.id) as adverts_count
		 ".$query." ".
			($sort == 1 ? "order by user.name" :
				($sort == 2 ? "order by adverts_count desc" : "order by r"))
			." limit ".$pages->offset.",".$pages->limit);
		$data['title'] = 'Риэлторы'.$this->getCityTitleCommon($model);
		$data['win_title'] = $data['title']." - КвартALL";
		$data['realtors_count'] = $realtors_count;
		$data['realtors'] = $realtors;
		break;

	case 'agencies':
		$model = new \\frontend\\models\\search\\sg();
		$this->setAddress($model, $city, $cityid, $region, $regionid);
		$this->setPrice($model, $price_from, $price_to);
		$model->load($_GET);

		$agencies = null;
		$agencies_count = 0;

		$query = preg_replace("/( |\\n|\\r)*(and|where)( |\\n|\\r)*$/", "", "
		from organization
			left join address
				on address.id = organization.address_id
		where
			(organization.status = 'active' or organization.status is null or organization.status = '') and
			organization.type = 1 and
			".($model->orgname != null && strlen($model->orgname) > 0 ? $this->whereName($model->orgname, "organization.name") : "")."
			".($model->region_id != null && strlen($model->region_id) > 1 ? "address.region_id = ".$model->region_id." and " : "")."
			".$this->whereCity($model)."
		");

		$agencies_count = \\App::qScalar("select distinct count(*) ".$query);
		$pages = new \\yii\\data\\Pagination(['totalCount' => $agencies_count, 'pageSize' => max(1, isset($get['per-page']) ? ($get['per-page'] == 'all' ? $agencies_count : $get['per-page']) : 5)]);
		$agencies = \\App::qAll("select distinct
			organization.*,
			rand(".$rand.") as r,
			(select count(*) from employee where org_id = organization.id and (select count(*) from admin where admin.user_id = employee.user_id) = 0 and employee.position <= 3) as employees_count,
			(select count(*) from ".\\App::AdvsTable()." advert_full where status = 'active' and ended_at >= unix_timestamp() and (select org_id from employee where (select count(*) from admin where admin.user_id = employee.user_id) = 0 and employee.user_id = advert_full.owner_id and employee.position <= 3 limit 0,1) = organization.id) as adverts_count,
			(select round(avg(value), 1) as rating from rating where rating.target = ".Rating::TARGET_ORGANIZATION." and rating.target_id = organization.id) as rating,
			(select count(*) as ratings_count from rating where rating.target = ".Rating::TARGET_ORGANIZATION." and rating.target_id = organization.id) as ratings_count
		 ".$query." ".
			($sort == 1 ? "order by organization.name" :
				($sort == 2 ? "order by rating desc" :
					($sort == 3 ? "order by employees_count desc" :
						($sort == 4 ? "order by adverts_count desc" : "order by r"))))
			." limit ".$pages->offset.",".$pages->limit);
		$data['title'] = 'Агентства недвижимости'.$this->getCityTitleCommon($model);
		$data['win_title'] = $data['title']." - КвартALL";
		$data['agencies_count'] = $agencies_count;
		$data['agencies'] = $agencies;
		break;

	case 'companies':
		$model = new \\frontend\\models\\search\\sg();
		$this->setAddress($model, $city, $cityid, $region, $regionid);
		$this->setPrice($model, $price_from, $price_to);
		$model->load($_GET);

		$companies = null;
		$companies_count = 0;

		$query = preg_replace("/( |\\n|\\r)*(and|where)( |\\n|\\r)*$/", "", "
		from organization
			left join address
				on address.id = organization.address_id
		where
			(organization.status = 'active' or organization.status is null or organization.status = '') and
			organization.type = 2 and
			".($model->orgname != null && strlen($model->orgname) > 0 ? $this->whereName($model->orgname, "organization.name") : "")."
			".($model->region_id != null && strlen($model->region_id) > 1 ? "address.region_id = ".$model->region_id." and " : "")."
			".$this->whereCity($model)."
		");

		$companies_count = \\App::qScalar("select distinct count(*) ".$query);
		$pages = new \\yii\\data\\Pagination(['totalCount' => $companies_count, 'pageSize' => max(1, isset($get['per-page']) ? $get['per-page'] == 'all' ? $companies_count : $get['per-page'] : 5)]);
		$companies = \\App::qAll("select distinct
			organization.*,
			rand(".$rand.") as r,
			(select count(*) from employee where org_id = organization.id and (select count(*) from admin where admin.user_id = employee.user_id) = 0 and employee.position <= 3) as employees_count,
			(select count(*) from ".\\App::AdvsTable()." advert_full where status = 'active' and ended_at >= unix_timestamp() and (select org_id from employee where (select count(*) from admin where admin.user_id = employee.user_id) = 0 and employee.user_id = advert_full.owner_id and employee.position <= 3 limit 0,1) = organization.id) as adverts_count,
			(select count(*) from ".\\App::ObjsTable()." object where object.developer_id = organization.id and (object.status is null or object.status = '' or object.status = 'Активен')) as objects_count,
			(select max(case when object.locate_ended_at > object.select_ended_at then object.locate_ended_at else object.select_ended_at end) from ".\\App::ObjsTable()." object where object.developer_id = organization.id and (object.status is null or object.status = '' or object.status = 'Активен') and (object.locate_ended_at > ".time()." or object.select_ended_at > ".time().")) as paid_index,
			(select round(avg(value), 1) from rating where rating.target = ".Rating::TARGET_ORGANIZATION." and rating.target_id = organization.id) as rating,
			(select count(*) from rating where rating.target = ".Rating::TARGET_ORGANIZATION." and rating.target_id = organization.id) as ratings_count
		 ".$query." ".
			($sort == 1 ? "order by organization.name" :
				($sort == 2 ? "order by rating desc" :
					($sort == 3 ? "order by objects_count desc" :
						($sort == 4 ? "order by adverts_count desc" : "order by paid_index desc, r"))))
			." limit ".$pages->offset.",".$pages->limit);
		$data['title'] = 'Строительные компании'.$this->getCityTitleCommon($model);
		$data['win_title'] = $data['title']." - КвартALL";
		$data['companies_count'] = $companies_count;
		$data['companies'] = $companies;
		break;
...`;
export const cs = `using GalaxyExtender.Controls;
using System;
using System.Collections.Generic;
using System.Globalization;
using System.Linq;
using System.Text;
using System.Text.RegularExpressions;
using System.Threading.Tasks;
using System.Windows;
using System.Windows.Data;
using System.Windows.Documents;
using System.Windows.Media;

namespace GalaxyExtender
{
    static class DataBaseExstensions
    {
        public static string GetField(this DataRow row, string column)
        {
            if (row == null)
                return null;
            return row.ItemArray[row.Table.Columns.IndexOf(column)].ToString();
        }
        public static string GetField(this DataRow row, int column)
        {
            return row.ItemArray[column].ToString();
        }
    }
    internal class DataBase
    {
        private String dbFileName;
        private SQLiteConnection dbConnection;
        private SQLiteCommand dbCommand;

        public static DateTime UnixTimeStampToDateTime(double unixTimeStamp)
        {
            System.DateTime dtDateTime = new DateTime(1970, 1, 1, 0, 0, 0, 0, DateTimeKind.Utc);
            dtDateTime = dtDateTime.AddSeconds(unixTimeStamp);
            return dtDateTime;
        }
        public static int DateTimeToUnixTimeStamp(DateTime dateTime)
        {
            System.DateTime dtDateTime = new DateTime(1970, 1, 1, 0, 0, 0, 0, System.DateTimeKind.Utc);
            return (int)dateTime.Subtract(dtDateTime).TotalSeconds;
        }
        public bool Connected
        {
            get { return dbConnection != null && dbConnection.State == System.Data.ConnectionState.Open; }
        }
        public DataBase()
        {
            dbConnection = new SQLiteConnection();
            dbCommand = new SQLiteCommand();
            dbFileName = "galext.sqlite";
        }
        void InitializeDb()
        {
            Execute("create table if not exists favorites (id integer primary key autoincrement, gid text, name text, ord integer, actual integer);" +
                    "create table if not exists categories (id integer primary key autoincrement, name text, actual integer, color text);" +
                    "create table if not exists messages (id integer primary key autoincrement, category_id integer, content text, ord integer, actual integer);" +
                    "create table if not exists smiles (id integer primary key autoincrement, num integer, notation text, rating int);" +
                    "create table if not exists mail (id integer primary key autoincrement, message_id integer, planet_gid, user_gid integer, person_code text, date integer);" +
                    "create table if not exists users (gid integer, nick text);" + // данных о пользователях когда то использовавшихся при рассылке
                    "create table if not exists settings (id integer primary key autoincrement, name text, value text);" +
                    "create table if not exists persons (gid integer, nick text, pass_hash text, restore_code text);" + // использовавшиеся данные моих персонажей
                    "create table if not exists careful_list (gid integer, nick text)"); // пользователи не попадающие в рассылку
            if (int.Parse(QueryScalar("select count(*) from categories where name = \\"Общая\\"")) == 0)
                Execute("insert into categories (name, actual, color) values (\\"Общая\\", 1, \\"#ffffff\\");");
            if (int.Parse(QueryScalar("select count(*) from settings where name = \\"last_favorite_id\\"")) == 0)
                Execute("insert into settings (name, value) values (\\"last_favorite_id\\", 0);");
        }
        public DataTable GetFavorites(bool ActualOnly = false)
        {
            return Query("select * from favorites " + (ActualOnly ? "where actual = 1 " : "") + "order by ord asc;");
        }
        public DataTable Query(string query)
        {
            dbCommand.CommandText = query;
            DataTable qt = new DataTable();
            SQLiteDataAdapter reader = new SQLiteDataAdapter(dbCommand);
            reader.Fill(qt);
            return qt;
        }
        public int Execute(string query)
        {
            dbCommand.CommandText = query;
            return dbCommand.ExecuteNonQuery();
        }
        public string QueryScalar(string query)
        {
            dbCommand.CommandText = query;
            object res = dbCommand.ExecuteScalar();
            if(res != null)
                return res.ToString();
            return null;
        }
        public void Connect()
        {
            if (!File.Exists(dbFileName))
                SQLiteConnection.CreateFile(dbFileName);
            try
            {
                dbConnection = new SQLiteConnection("Data Source=" + dbFileName + ";Version=3;");
                dbConnection.Open();
                dbCommand.Connection = dbConnection;
                InitializeDb();
            }
            catch (SQLiteException ex)
            {
                MessageBox.Show(ex.Message);
            } 
        }
    }
    public class NumberMultiplierConverter : IValueConverter
    {
        public double Multiplier { get; set; }
        public double MinBalance { get; set; }
        public object Convert(object value, Type targetType, object parameter, CultureInfo culture)
        {
            Double val;
            try
            {
                val = Double.Parse(value.ToString());
            }   
            catch
            {
                return 0;
            }
            if (Multiplier < 1)
            {
                if (((1 - Multiplier) * val) < MinBalance)
                    return val - MinBalance;
            }
            return val * Multiplier;

        }
        public object ConvertBack(object value, Type targetType, object parameter, CultureInfo culture)
        {
            Double val;
            try
            {
                val = Double.Parse(value.ToString());
            }
            catch
            {
                return 0;
            }
            return val / Multiplier;
        }
    }
    static class Extensions
    {
        public static DialogMessageInfo Info(this DialogTitle dTitle)
        {
            if (dTitle == null || dTitle.Tag is null || !(dTitle.Tag is DialogMessageInfo))
                return null;
            return dTitle.Tag as DialogMessageInfo;
        }
        public static Color FromHex(this Color color, string value)
        {
            color = (Color)ColorConverter.ConvertFromString(value);
            return color;
        }
        public static string EcraneRegex(this string regexString)
        {
            StringBuilder regexStringBuilder = new StringBuilder(regexString);
            string chars = ".$^{[(|)*+?";
            regexStringBuilder.Replace("\\", "*&back-slash&*");
            foreach (char c in chars)
                regexStringBuilder.Replace(c.ToString(), "\\" + c);
            regexStringBuilder.Replace("*&back-slash&*", "\\\\");
            return regexStringBuilder.ToString();
        }
        public static string ToHex(this Color c)
        {
            return $"#{c.R:X2}{c.G:X2}{c.B:X2}";
        }
        public static DependencyObject FindParent(this DependencyObject dependencyObject, Type parentType)
        {
            var parent = VisualTreeHelper.GetParent(dependencyObject);

            if (parent == null) return null;
            if (parent.GetType() == parentType)
                return parent;
            return FindParent(parent, parentType);
        }
    }
    public static class FlowDocumentExtensions
    {
        private static IEnumerable<TextElement> GetRunsAndParagraphs(FlowDocument doc)
        {
            for (TextPointer position = doc.ContentStart;
              position != null && position.CompareTo(doc.ContentEnd) <= 0;
              position = position.GetNextContextPosition(LogicalDirection.Forward))
            {
                if (position.GetPointerContext(LogicalDirection.Forward) == TextPointerContext.ElementEnd)
                {
                    InlineUIContainer ui = position.Parent as InlineUIContainer;
                    if (ui != null)
                    {
                        Run run = new Run("ааа");
                        yield return run;
                    }
                    else
                    {
                        Run run = position.Parent as Run;
                        if (run != null)
                        {
                            yield return run;
                        }
                        else
                        {
                            Paragraph para = position.Parent as Paragraph;

                            if (para != null)
                            {
                                yield return para;
                            }
                        }
                    }
                }
            }
        }
        public static FormattedText GetFormattedText(this FlowDocument doc)
        {
            if (doc == null)
                throw new ArgumentNullException("doc");
            FormattedText output = new FormattedText(
              GetText(doc),
              CultureInfo.CurrentCulture,
              doc.FlowDirection,
              new Typeface(doc.FontFamily, doc.FontStyle, doc.FontWeight, doc.FontStretch),
              doc.FontSize,
              doc.Foreground);
            int offset = 0;
            foreach (TextElement el in GetRunsAndParagraphs(doc))
            {
                Run run = el as Run;
                if (run != null)
                {
                    int count = run.Text.Length;
                    output.SetFontFamily(run.FontFamily, offset, count);
                    output.SetFontStyle(run.FontStyle, offset, count);
                    output.SetFontWeight(run.FontWeight, offset, count);
                    output.SetFontSize(run.FontSize, offset, count);
                    output.SetForegroundBrush(run.Foreground, offset, count);
                    output.SetFontStretch(run.FontStretch, offset, count);
                    output.SetTextDecorations(run.TextDecorations, offset, count);
                    offset += count;
                }
                else
                    offset += Environment.NewLine.Length;
            }
            return output;
        }
        private static string GetText(FlowDocument doc)
        {
            StringBuilder sb = new StringBuilder();

            foreach (TextElement el in GetRunsAndParagraphs(doc))
            {
                Run run = el as Run;
                sb.Append(run == null ? Environment.NewLine : run.Text);
            }
            return sb.ToString();
        }
    }
}`;
export const wpf = `<UserControl x:Class="GalaxyExtender.Views.FavoritesView"
             xmlns="http://schemas.microsoft.com/winfx/2006/xaml/presentation"
             xmlns:x="http://schemas.microsoft.com/winfx/2006/xaml"
             xmlns:mc="http://schemas.openxmlformats.org/markup-compatibility/2006" 
             xmlns:d="http://schemas.microsoft.com/expression/blend/2008" 
             xmlns:iconPacks="http://metro.mahapps.com/winfx/xaml/iconpacks"
             xmlns:local="clr-namespace:GalaxyExtender"
             xmlns:li="http://github.com/zeluisping/loadingIndicators/xaml/controls"
             mc:Ignorable="d" 
             d:DesignHeight="450" d:DesignWidth="800">
    <UserControl.Resources>
        <Style TargetType="{x:Type ListBoxItem}">
            <Setter Property="Template">
                <Setter.Value>
                    <ControlTemplate TargetType="{x:Type ListBoxItem}">
                        <Grid>
                            <Grid.ColumnDefinitions>
                                <ColumnDefinition Width="Auto" />
                                <ColumnDefinition />
                            </Grid.ColumnDefinitions>
                            <Border x:Name="preBg" Width="5" Visibility="Collapsed"></Border>
                            <Border Grid.Column="1" Background="Transparent" x:Name="bg">
                                <ContentPresenter x:Name="presenter" HorizontalAlignment="{TemplateBinding HorizontalContentAlignment}"
                                            SnapsToDevicePixels="{TemplateBinding SnapsToDevicePixels}"
                                            VerticalAlignment="{TemplateBinding VerticalContentAlignment}" />
                            </Border>
                        </Grid>
                        <ControlTemplate.Triggers>
                            <MultiDataTrigger>
                                <MultiDataTrigger.Conditions>
                                    <Condition Binding="{Binding ElementName=presenter, Path=Content.Actual}" Value="True" />
                                </MultiDataTrigger.Conditions>
                                <Setter Property="Background" TargetName="preBg">
                                    <Setter.Value>
                                        <SolidColorBrush Color="#84bd6d" />
                                    </Setter.Value>
                                </Setter>
                                <Setter Property="Background" TargetName="bg">
                                    <Setter.Value>
                                        <SolidColorBrush Color="#84bd6d" Opacity="0.3" />
                                    </Setter.Value>
                                </Setter>
                            </MultiDataTrigger>
                            <MultiDataTrigger>
                                <MultiDataTrigger.Conditions>
                                    <Condition Binding="{Binding ElementName=presenter, Path=Content.Actual}" Value="False" />
                                </MultiDataTrigger.Conditions>
                                <Setter Property="Background" TargetName="preBg">
                                    <Setter.Value>
                                        <SolidColorBrush Color="#bd6d6d" />
                                    </Setter.Value>
                                </Setter>
                                <Setter Property="Background" TargetName="bg">
                                    <Setter.Value>
                                        <SolidColorBrush Color="#bd6d6d" Opacity="0.3" />
                                    </Setter.Value>
                                </Setter>
                            </MultiDataTrigger>
                            <MultiTrigger>
                                <MultiTrigger.Conditions>
                                    <Condition Property="IsSelected" Value="True" />
                                </MultiTrigger.Conditions>
                                <Setter Property="Visibility" TargetName="preBg" Value="Visible" />
                            </MultiTrigger>
                            <MultiTrigger>
                                <MultiTrigger.Conditions>
                                    <Condition Property="IsSelected" Value="False" />
                                </MultiTrigger.Conditions>
                                <Setter Property="Background" TargetName="bg">
                                    <Setter.Value>
                                        <SolidColorBrush Color="Transparent" />
                                    </Setter.Value>
                                </Setter>
                            </MultiTrigger>
                        </ControlTemplate.Triggers>
                    </ControlTemplate>
                </Setter.Value>
            </Setter>
            <Setter Property="AllowDrop" Value="True" />
            <EventSetter Event="PreviewMouseDown" Handler="LbxItemCont_PreviewMouseLeftButtonDown" />
            <EventSetter Event="Drop" Handler="LbxItemCont_Drop" />
            <Style.Triggers>
                <Trigger Property="IsSelected" Value="True">
                    <Setter Property="Background" Value="Red"/>
                </Trigger>
            </Style.Triggers>
        </Style>
    </UserControl.Resources>
    <Grid>
        <Grid.RowDefinitions>
            <RowDefinition Height="Auto"></RowDefinition>
            <RowDefinition></RowDefinition>
        </Grid.RowDefinitions>
        <WrapPanel Orientation="Horizontal">
            <Button Padding="0" Style="{DynamicResource SquareButtonStyle}" Width="{Binding RelativeSource={RelativeSource Mode=Self}, Path=ActualHeight}" BorderThickness="0" Click="Add_Handler">
                <Grid>
                    <Viewbox Height="18" Width="18" x:Name="addLoader" Visibility="Collapsed">
                        <li:LoadingIndicator SpeedRatio="2" Mode="Arcs" Foreground="{StaticResource BlackBrush}" />
                    </Viewbox>
                    <iconPacks:PackIconMaterial x:Name="addIcon" Kind="Plus" VerticalAlignment="Center" HorizontalAlignment="Center" />
                </Grid>
            </Button>
            <Button Style="{DynamicResource SquareButtonStyle}" Width="{Binding RelativeSource={RelativeSource Mode=Self}, Path=ActualHeight}" BorderThickness="0" Click="Refresh_Handler">
                <iconPacks:PackIconMaterial Kind="Refresh" VerticalAlignment="Center" HorizontalAlignment="Center" />
            </Button>
            <TextBlock VerticalAlignment="Center" Margin="7 0 7 0" TextWrapping="Wrap" Foreground="{DynamicResource BlackBrush}">Вы можете исключить некоторых пользователей из рассылки. Для этого добавьте их в этом списке:</TextBlock>
        </WrapPanel>
        <ListBox Grid.Row="1" x:Name="ItemsContainerLbx">

        </ListBox>
        <Border Grid.RowSpan="2" x:Name="LoaderBorder" Visibility="Collapsed">
            <Border.Background>
                <SolidColorBrush Color="{StaticResource WhiteColor}" Opacity="0.7"></SolidColorBrush>
            </Border.Background>
            <StackPanel Orientation="Vertical" HorizontalAlignment="Center" VerticalAlignment="Center">
                <Viewbox Height="30" Width="30" x:Name="LoadLoader">
                    <li:LoadingIndicator SpeedRatio="2" Mode="Arcs" Foreground="{StaticResource BlackBrush}" />
                </Viewbox>
                <Label>Загрузка</Label>
            </StackPanel>
        </Border>
    </Grid>
</UserControl>
`;
export const onec = `Функция ОтрицательныеОстаткиПоТоварамНаСкладах(Движения, ДатаОстатков, ДатаДокумента, Регистратор = NULL)
	Запрос = Новый Запрос;
	Запрос.Текст = "ВЫБРАТЬ
	|	ТоварыНаСкладах.ВидДвижения,
	|	ТоварыНаСкладах.Склад,
	|	ВЫРАЗИТЬ(ТоварыНаСкладах.Номенклатура КАК Справочник.Номенклатура) КАК Номенклатура,
	|	ТоварыНаСкладах.Количество КАК Количество
	|ПОМЕСТИТЬ Движения
	|ИЗ
	|	&Движения КАК ТоварыНаСкладах
	|;
	|////////////////////////////////////////////////////////////////////////////////
	|ВЫБРАТЬ
	|	Движения.Склад,
	|	Движения.Номенклатура,
	|	0 КАК КоличествоОстаток,
	|	Движения.Номенклатура.ЕдиницаХраненияОстатков КАК Единица,
	|	"""" КАК Регистратор,
	|	ВЫРАЗИТЬ(&ДатаОстатков КАК Дата) КАК ДатаРегистратора,
	|	""НачальныйОстаток"" КАК ВидРегистратора
	|ПОМЕСТИТЬ ВсеОстатки
	|ИЗ
	|	Движения
	|ОБЪЕДИНИТЬ ВСЕ
	|ВЫБРАТЬ
	|	ТоварыНаСкладахОстатки.Склад,
	|	ТоварыНаСкладахОстатки.Номенклатура,
	|	ТоварыНаСкладахОстатки.КоличествоКонечныйОстаток КАК КоличествоОстаток,
	|	ТоварыНаСкладахОстатки.Номенклатура.ЕдиницаХраненияОстатков КАК Единица,
	|   ЕСТЬNULL(ТоварыНаСкладахОстатки.Регистратор.Ссылка, """") КАК Регистратор,
	|	ЕСТЬNULL(ТоварыНаСкладахОстатки.Регистратор.Дата, ВЫРАЗИТЬ(&ДатаОстатков КАК Дата)) КАК ДатаРегистратора,
	|	ВЫБОР КОГДА ТоварыНаСкладахОстатки.Регистратор.Ссылка ЕСТЬ NULL
	|		ТОГДА  ""НачальныйОстаток""
	|		ИНАЧЕ  ""Регистратор""
	|	КОНЕЦ КАК ВидРегистратора
	|ИЗ
	|	РегистрНакопления.ТоварыНаСкладах.ОстаткиИОбороты(&ДатаОстатков, , Регистратор, , Номенклатура В (ВЫБРАТЬ Д.Номенклатура ИЗ Движения Д)) КАК ТоварыНаСкладахОстатки
	|" + ?(ЗначениеЗаполнено(Регистратор), "ГДЕ ТоварыНаСкладахОстатки.Регистратор <> &Регистратор", "") + "
	|;
	|////////////////////////////////////////////////////////////////////////////////
	|ВЫБРАТЬ
	|	ВсеОстатки.Склад,
	|	ВсеОстатки.Номенклатура,
	|	СУММА(ВсеОстатки.КоличествоОстаток),
	|	ВсеОстатки.Единица,
	|	ВсеОстатки.Регистратор,
	|	ВсеОстатки.ДатаРегистратора,
	| 	ВсеОстатки.ВидРегистратора
	|ПОМЕСТИТЬ Остатки
	|ИЗ ВсеОстатки
	|СГРУППИРОВАТЬ ПО
	|	ВсеОстатки.Регистратор,
	|	ВсеОстатки.ДатаРегистратора,
	|	ВсеОстатки.ВидРегистратора,
	|	ВсеОстатки.Склад,
	|	ВсеОстатки.Номенклатура,
	|	ВсеОстатки.Единица
	|;
	|////////////////////////////////////////////////////////////////////////////////
	|ВЫБРАТЬ
	|	Движения.Склад,
	|	СУММА(ВЫБОР
	|			КОГДА Движения.ВидДвижения = ЗНАЧЕНИЕ(ВидДвиженияНакопления.Приход)
	|				ТОГДА 1
	|			ИНАЧЕ -1
	|		КОНЕЦ * Движения.Количество) КАК Количество,
	|	Движения.Номенклатура
	|ПОМЕСТИТЬ ДвиженияИтоги
	|ИЗ
	|	Движения КАК Движения
	|
	|СГРУППИРОВАТЬ ПО
	|	Движения.Склад,
	|	Движения.Номенклатура
	|;
	|////////////////////////////////////////////////////////////////////////////////
	|ВЫБРАТЬ
	|	ЕСТЬNULL(Остатки.Склад, ДвиженияИтоги.Склад) КАК Склад,
	|	ВЫБОР 
	|		КОГДА (" + ?(ДатаОстатков = ДатаДокумента, "Остатки.Регистратор ЕСТЬ NULL ИЛИ Остатки.Регистратор = """" ИЛИ ", "") + "Остатки.Регистратор.Дата >= &ДатаДокумента) 
	|			ТОГДА ЕСТЬNULL(Остатки.КоличествоОстаток, 0) + ЕСТЬNULL(ДвиженияИтоги.Количество, 0)
	|			ИНАЧЕ ЕСТЬNULL(Остатки.КоличествоОстаток, 0) 
	|		КОНЕЦ КАК КоличествоОстаток,
	|	ЕСТЬNULL(Остатки.Единица, ДвиженияИтоги.Номенклатура.ЕдиницаХраненияОстатков) КАК Единица,
	|	ЕСТЬNULL(Остатки.Номенклатура, ДвиженияИтоги.Номенклатура) КАК Номенклатура,
	|   ЕСТЬNULL(Остатки.Регистратор, """") КАК Регистратор,
	|   ЕСТЬNULL(Остатки.ДатаРегистратора, ВЫРАЗИТЬ(&ДатаОстатков КАК Дата)) КАК ДатаРегистратора,
	|   ЕСТЬNULL(Остатки.ВидРегистратора, ""НачальныйОстаток"") КАК ВидРегистратора
	|ПОМЕСТИТЬ ПредРезультат
	|ИЗ
	|	Остатки КАК Остатки
	|		ПОЛНОЕ СОЕДИНЕНИЕ ДвиженияИтоги КАК ДвиженияИтоги
	|		ПО Остатки.Склад = ДвиженияИтоги.Склад
	|			И Остатки.Номенклатура = ДвиженияИтоги.Номенклатура;
	|////////////////////////////////////////////////////////////////////////////////
	|ВЫБРАТЬ
	|	ПредРезультат.Склад, 
	|	МИНИМУМ(ПредРезультат.КоличествоОстаток) КАК КоличествоОстаток,
	|	ПредРезультат.Единица, 
	|	ПредРезультат.Номенклатура, 
	|	МАКСИМУМ(ПредРезультат.Регистратор) КАК Регистратор,
	|	ПредРезультат.ДатаРегистратора,
	|	ПредРезультат.ВидРегистратора 
	|ПОМЕСТИТЬ Результат
	|ИЗ ПредРезультат
	|СГРУППИРОВАТЬ ПО ПредРезультат.Склад, ПредРезультат.Единица, ПредРезультат.Номенклатура, ПредРезультат.ВидРегистратора, ПредРезультат.ДатаРегистратора
	|ИМЕЮЩИЕ
	|	МИНИМУМ(ПредРезультат.КоличествоОстаток) < 0 ИЛИ ПредРезультат.ДатаРегистратора = &ДатаОстатков;
	|////////////////////////////////////////////////////////////////////////////////
	|ВЫБРАТЬ * ИЗ Результат
	|УПОРЯДОЧИТЬ ПО Результат.Регистратор.Дата, Результат.Регистратор.Номер;";
	Запрос.УстановитьПараметр("Движения",Движения);
	Запрос.УстановитьПараметр("ДатаОстатков", ДатаОстатков);
	Запрос.УстановитьПараметр("ДатаДокумента", ДатаДокумента);
	Если ЗначениеЗаполнено(Регистратор) Тогда
		Запрос.УстановитьПараметр("Регистратор", Регистратор);
	КонецЕсли;
	РезультатЗапроса = Запрос.Выполнить().Выгрузить();
	Возврат РезультатЗапроса;
КонецФункции

Процедура КонтрольТекущихОсатковПриЗаписи(Источник, Отказ) Экспорт
	УстановитьПривилегированныйРежим(Истина);
	Если Источник.ОбменДанными.Загрузка Тогда
		Возврат;
	КонецЕсли;
	Если НЕ Константы.КонтролироватьТекущиеОстатки.Получить() Тогда
		Возврат;
	КонецЕсли;
	Если НЕ Источник.Проведен и Источник.ДополнительныеСвойства.Свойство("БылПроведен") = Ложь Тогда
		Возврат;
	КонецЕсли;
	
	Проведен = Источник.ДополнительныеСвойства.Свойство("Перепроведение") И Источник.ДополнительныеСвойства.Перепроведение;
	Приход = Ложь;
	Если Проведен Тогда
		ТоварыПередЗаписью = Источник.ДополнительныеСвойства.ТоварыПередЗаписью;
		Приход = ?(ТоварыПередЗаписью.Количество() = 0, Ложь, ТоварыПередЗаписью[0].ВидДвижения = ВидДвиженияНакопления.Приход); 
	Иначе
		ТоварыПередЗаписью = ТаблицаДвиженийПоТоварамНаСкладах();
		Приход = ?(Источник.Движения.ТоварыНаСкладах.Количество() = 0, Ложь, Источник.Движения.ТоварыНаСкладах[0].ВидДвижения = ВидДвиженияНакопления.Приход); 
	КонецЕсли;
	ДатаОстатков = ?(Проведен И Приход, Мин(Источник.ДополнительныеСвойства.ДатаДоПроведения, Источник.Дата), Источник.Дата); // Дата с которой проверяем отрицательные остатки по товарам на складах
	ОтменаПроведения = Источник.ДополнительныеСвойства.Свойство("ОтменаПроведения") И Источник.ДополнительныеСвойства.ОтменаПроведения;
	Если Не Приход И ОтменаПроведения Тогда
		Возврат;
	КонецЕсли;
	Если Не Проведен И Приход Тогда
		Возврат;
	КонецЕсли;
	ДвиженияТоваровДо = ТаблицаДвиженийПоТоварамНаСкладах();
	ДвиженияТоваровПосле = ТаблицаДвиженийПоТоварамНаСкладах();
	Для Каждого СтрокаТовар Из ТоварыПередЗаписью Цикл
		Строка = ДвиженияТоваровДо.Добавить();
		Строка.Номенклатура = СтрокаТовар.Номенклатура;
		Строка.Склад = СтрокаТовар.Склад;
		Строка.ВидДвижения = СтрокаТовар.ВидДвижения;
		Строка.Количество = ?(Приход, СтрокаТовар.Количество, 0); //Для реализации колво "До" тоже нулевое, если по ней уже есть отрицательные остатки, иначе разницы не будет до и после (до есть отриц. остатки и после они же)
	КонецЦикла;
	Если ОтменаПроведения Тогда
		ДвиженияТоваровПосле = ДвиженияТоваровДо.Скопировать();
		Для Каждого Строка Из ДвиженияТоваровПосле Цикл
			Строка.Количество = 0;
		КонецЦикла;
	Иначе
		Для Каждого СтрокаТовар Из Источник.Движения.ТоварыНаСкладах Цикл
			Строка = ДвиженияТоваровПосле.Добавить();
			Строка.Номенклатура = СтрокаТовар.Номенклатура;
			Строка.Склад = СтрокаТовар.Склад;
			Строка.ВидДвижения = СтрокаТовар.ВидДвижения;  
			Строка.Количество = ?(ОтменаПроведения, 0, СтрокаТовар.Количество);
		КонецЦикла;
		Если Проведен И Приход Тогда //При перепроведении учитываем, что товары могли быть удалены или заменены в приходе и добавляем удаленные в список после, чтобы по этим номенклатурам тоже проверялись остатки
			Для Каждого СтрокаТовар Из ТоварыПередЗаписью Цикл
				УдаленнаяСтрока = Истина;
				Для Каждого СтрокаИсточник Из Источник.Товары Цикл
					Если СтрокаИсточник.Номенклатура = СтрокаТовар.Номенклатура И СтрокаИсточник.Склад = СтрокаТовар.Склад Тогда
						УдаленнаяСтрока = Ложь;
						Прервать;
					КонецЕсли;
				КонецЦикла;
				Если УдаленнаяСтрока Тогда
					Строка = ДвиженияТоваровПосле.Добавить();
					Строка.Номенклатура = СтрокаТовар.Номенклатура;
					Строка.Склад = СтрокаТовар.Склад;
					Строка.ВидДвижения = СтрокаТовар.ВидДвижения; 
					Строка.Количество = 0;
				КонецЕсли;
			КонецЦикла;
		КонецЕсли;
	КонецЕсли;
	ОтрицательныеОстаткиДо = ОтрицательныеОстаткиПоТоварамНаСкладах(ДвиженияТоваровДо, ДатаОстатков, ДатаОстатков, Источник.Ссылка);
	ОтрицательныеОстаткиПосле = ОтрицательныеОстаткиПоТоварамНаСкладах(ДвиженияТоваровПосле, ДатаОстатков, Источник.Дата, Источник.Ссылка);
	ОстаткиПоДокументу = ОтрицательныеОстаткиПосле.Скопировать();
	ОстаткиПоДокументу.Очистить();
	Для Каждого ОстатокПосле Из ОтрицательныеОстаткиПосле Цикл
		ОбрануженДо = Ложь;
		Для Каждого ОстатокДо Из ОтрицательныеОстаткиДо Цикл
			Если ОстатокДо.Склад = ОстатокПосле.Склад 
				И ОстатокДо.КоличествоОстаток <= ОстатокПосле.КоличествоОстаток
				И ОстатокДо.Единица = ОстатокПосле.Единица
				И ОстатокДо.Номенклатура = ОстатокПосле.Номенклатура
				И ОстатокДо.Регистратор = ОстатокПосле.Регистратор Тогда
				ОбрануженДо = Истина;
			КонецЕсли;
		КонецЦикла;	
		Если Не ОбрануженДо Тогда
			СтрокаОстатка = ОстаткиПоДокументу.Добавить();
			СтрокаОстатка.Склад = ОстатокПосле.Склад;
			СтрокаОстатка.КоличествоОстаток = ОстатокПосле.КоличествоОстаток;
			СтрокаОстатка.Единица = ОстатокПосле.Единица;
			СтрокаОстатка.Номенклатура = ОстатокПосле.Номенклатура;
			СтрокаОстатка.Регистратор = ОстатокПосле.Регистратор;
			СтрокаОстатка.ВидРегистратора = ОстатокПосле.ВидРегистратора;
			СтрокаОстатка.ДатаРегистратора = ОстатокПосле.ДатаРегистратора;
		КонецЕсли;
	КонецЦикла;
	Результат = ОстаткиПоДокументу;
	
	УстановитьПривилегированныйРежим(Ложь);

	ТекстСообщения = "Действие отменено, так как в результате образуется отрицательный остаток по номенклатурам:";
	СписокНоменклатур = Новый СписокЗначений;
	Для Каждого СтрокаОтрОстатка Из Результат Цикл
		Если СписокНоменклатур.НайтиПоЗначению(СтрокаОтрОстатка.Номенклатура) <> Неопределено Тогда
			Продолжить;
		КонецЕсли;
		Если СтрокаОтрОстатка.ВидРегистратора = "НачальныйОстаток" И СтрокаОтрОстатка.КоличествоОстаток < 0  Тогда
			НеАктуально = Ложь;
			Для Каждого Стр Из Результат Цикл
				Если Стр.ДатаРегистратора = СтрокаОтрОстатка.ДатаРегистратора 
					И Стр.ВидРегистратора = "Регистратор"
					И Стр.Номенклатура = СтрокаОтрОстатка.Номенклатура
					И Стр.Единица = СтрокаОтрОстатка.Единица
					И Стр.Склад = СтрокаОтрОстатка.Склад Тогда
					НеАктуально = Истина;
					Прервать;
				КонецЕсли;
			КонецЦикла;
			Если НеАктуально Тогда
				Продолжить;
			КонецЕсли;
		ИначеЕсли СтрокаОтрОстатка.КоличествоОстаток >= 0 Тогда
			Продолжить;
		КонецЕсли;
		Отказ = Истина;
		ОтрОстатокПоТекДокументу = Ложь;
		Если СтрокаОтрОстатка.ДатаРегистратора = ДатаОстатков И Не Приход Тогда
			Для Каждого Стр Из Результат Цикл	
				Если Стр.ДатаРегистратора = ДатаОстатков 
					И Стр.ВидРегистратора = "НачальныйОстаток"
					И Стр.Номенклатура = СтрокаОтрОстатка.Номенклатура
					И Стр.Единица = СтрокаОтрОстатка.Единица
					И Стр.Склад = СтрокаОтрОстатка.Склад Тогда
					ОтрОстатокПоТекДокументу = Истина;
					Прервать;
				КонецЕсли;
			КонецЦикла;
		КонецЕсли;
		СписокНоменклатур.Добавить(СтрокаОтрОстатка.Номенклатура);
		ТекстСообщения=ТекстСообщения+Символы.ПС+"- """+СтрокаОтрОстатка.Номенклатура + ?(ОтрОстатокПоТекДокументу, """ на " + СтрокаОтрОстатка.ДатаРегистратора, """")
		+" на складе """+СтрокаОтрОстатка.Склад+""" в количестве "+СтрокаОтрОстатка.КоличествоОстаток+" "+СтрокаОтрОстатка.Единица
		+?(ЗначениеЗаполнено(СтрокаОтрОстатка.Регистратор) И Не ОтрОстатокПоТекДокументу, " после уже проведенного документа """ + СтрокаОтрОстатка.Регистратор + """", "");
	КонецЦикла;	
	
	Если Не Отказ Тогда
		Возврат;
	КонецЕсли;

	Сообщить(ТекстСообщения, СтатусСообщения.Важное);	
КонецПроцедуры`;
