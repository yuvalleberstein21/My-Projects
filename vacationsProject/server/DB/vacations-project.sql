-- phpMyAdmin SQL Dump
-- version 5.1.3
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: May 23, 2023 at 05:22 PM
-- Server version: 10.4.21-MariaDB
-- PHP Version: 7.4.28

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `vacations-project`
--

-- --------------------------------------------------------

--
-- Table structure for table `followers`
--

CREATE TABLE `followers` (
  `userID` int(11) NOT NULL,
  `vacationsID` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `followers`
--

INSERT INTO `followers` (`userID`, `vacationsID`) VALUES
(39, 12),
(4, 13),
(74, 26),
(39, 30),
(4, 15),
(98, 27),
(39, 14),
(98, 15),
(99, 14),
(98, 12),
(98, 28),
(98, 13);

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `name` varchar(100) NOT NULL,
  `lastName` varchar(100) NOT NULL,
  `email` varchar(250) NOT NULL,
  `password` varchar(250) NOT NULL,
  `role` varchar(45) DEFAULT 'user'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `name`, `lastName`, `email`, `password`, `role`) VALUES
(3, 'admin', 'adminAdmin', 'admin@gmail.com', '$2a$08$88ctSoLTnyGLrf2HRAUrKOFzmBZ9a8BtWc3k8zcXkXDT/ZCn4IAQe', 'admin'),
(4, 'test', 'testTest', 'test@gmail.com', '$2a$08$taetLcBmxSHQ1hPiN.aQpe4JlvXdlvjEqA58YA9Z.wfDR70ygy2TC', 'user'),
(39, 'test29', 'test29', 'test29@gmail.com', '$2a$10$TraCSM4s9jQwG5.tHNlUwurs/tupNvi9tjgXN2NlEyad4.TYZhaki', 'user'),
(74, 'test62', 'test62', 'test62@gmail.com', '$2a$10$eFsOin.mwgUlvlh.EoxyRezuimR.ImEw0GftWBrWQp1BFwo5y9nL.', 'user'),
(98, 'yuval', 'leberstein', 'yuvalleberstein21@gmail.com', '$2a$10$uuq03N5I6nmF11hLq4Pxdesg2625VKvDqGTl9OcUBZliSOvHiy/6K', 'user'),
(99, 'test63', 'test63', 'test63@gmail.com', '$2a$10$VBTChkBLcR1/prYgee9MhOZb.Im3YOd8MvZYsScwUlpvXfkpdg8ka', 'user'),
(100, 'newTest', 'newTest', 'newtest@gmail.com', '$2a$08$tqzdkIjV/yV2hGJGz/oriOhcGEnhRqT9yZ82g/0YWJ6.zGjtLAe/C', 'user'),
(101, 'test_test', 'test_test', 'test_test@gmail.com', '$2a$08$NQBnVne11yRc0PvYdksqwePAVJlrcHvJkBtJHJnvSHERWoGAl7p8C', 'user'),
(102, 'test_test1', 'test_test1', 'test_test1@gmail.com', '$2a$08$NZG2j8hVFnBukW5FnvFeceb.ajfo6/ylrIKWztFAlQ.Y8h91fYaLO', 'user'),
(103, 'test_test2', 'test_test2', 'test_test2@gmail.com', '$2a$08$6vgS9yHQpxrqQUUN518trezJkxlseksEE9Ep6cBTvFDh69LjZNb2i', 'user'),
(104, 'test_test3', 'test_test3', 'test_test3@gmai.com', '$2a$08$jNxz7Hh7YG0Cceuzlj7PWexuSl0L.drgWSmu1SzgLK6tne8XRba12', 'user'),
(105, 'test_test4', 'test_test4', 'test_test4@gmail.com', '$2a$08$hebQddhcCHubBNJZZPO//e1uqJPiG3DNfkjegWshbTZ/W2.b2Cfsy', 'user'),
(106, 'test_test5', 'test_test5', 'test_test5@gmail.com', '$2a$08$ZDsjSwkJdwfxbexC5YWcvuzQh9byO5ug7jbEU5gD1w2rSp4/hqqSe', 'user');

-- --------------------------------------------------------

--
-- Table structure for table `vacations`
--

CREATE TABLE `vacations` (
  `vacID` int(11) NOT NULL,
  `destination` varchar(50) NOT NULL,
  `description` varchar(1200) NOT NULL,
  `startDate` date NOT NULL,
  `endDate` date NOT NULL,
  `price` varchar(10) NOT NULL,
  `imageName` varchar(400) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `vacations`
--

INSERT INTO `vacations` (`vacID`, `destination`, `description`, `startDate`, `endDate`, `price`, `imageName`) VALUES
(12, 'Barcelona', 'ברצלונה, בירת חבל קטלוניה שבספרד, היא עיר תוססת ומרשימה, מוקד של תרבות, אמנות, יופי והנאה. זוהי עיר עם חיי לילה מהנים ומגוונים, מסעדות משובחות, אתרי תרבות ואמנות ידועים, שפע של אתרי ביקור ותיור וכמובן מלונות רבים המתאימים לכל מבקר. כל אלו הופכים את ברצלונה ליעד תיירות מבוקש ופופולרי, וזוהי למעשה אחת הערים המתוירות בעולם!\r\nברצלונה היא עיר חוף יפהפייה בספרד ואחת הערים הגדולות באירופה. היא נוסדה על ידי הרומים והפכה בימי הביניים לחלק חיוני מממלכת אראגון, ובעת המודרנית חיזקה את מעמדה ככוח הימי החזק ביותר בים התיכון וכעיר המזוהה עם אוכל טוב, מוזיקה נפלאה, אמנות ייחודית וספורט.', '2023-04-07', '2023-04-11', '285', '1683790466839_barcelona.jpg'),
(13, 'Rome', 'איטליה מתהדרת באחת מערי הבירה היפות והמרתקות בעולם בכלל ובאירופה בפרט, הלא היא רומא (Rome). לכן, למטייל המחפש חופשה אורבנית - רומא היא יעד מצויין. העיר היתה בירתה של האימפריה הרומית העתיקה, בה ישבו מושלי האימפריה וממנה ניהלו את ענייניה. כיום, רומא, היושבת על גדות נהר הטייבר, היא המרכז השלטוני של איטליה ומהווה אטרקציה תיירותית עולמית.\r\nהקולוסיאום המפורסם בעולם, הפך להיות סמלה של העיר. זהו המבנה הגדול ביותר שנותר באזור רומא העתיקה ואפשר להתרשם מממדיו ועוצמתו גם כיום, לאחר כל התלאות שעברו עליו.', '2023-04-13', '2023-04-18', '355', 'image_1681038844123.jpg'),
(14, 'London', 'לונדון (London) היא בירתה של בריטניה וגם העיר הגדולה ביותר בכל המדינה ולמעשה גם בכל מערב אירופה. זוהי בירה עולמית שופעת יופי והדר, תרבות, אמנות, אטרקציות, אופנה, היסטוריה ואווירה יוצאת דופן, שרק בלונדון ניתן לחוש בה.\r\nלונדון היא אחד ממוקדי המשיכה העיקריים לתיירים מסביב לעולם, בזכות מאפייניה ובזכות שרשרת אתרים ואטרקציות: הביג בן ובניין הפרלמנט, הטאואר וגשר לונדון, רחוב אוקספורד היוקרתי, ההייד פארק, ארמון באקינגהאם, מוזיאון מאדאם טוסו, הגלגל הענק שעל התמזה, כיכר טרפלגר וכיכר פיקדילי- כל כך הרבה אטרקציות בלונדון וזה רק חלק ממה שיש ללונדון להציע.', '2023-04-21', '2023-04-28', '800', 'image_1681038906699.jpg'),
(15, 'Phuket', 'פוקט (Phuket) ממוקם בים אנדמן במרחק של כ-885 ק\"מ דרומית לבנגקוק. זהו מקום הנופש הפופולארי ביותר בתאילנד ואחד הידועים בעולם. כמו שאר החופים המצליחים באסיה, פוקט התגלה על ידי תרמילאים, שחיפשו מקום שמנותק מהמציאות, בעל בקתות פשוטות ואוכל מקומי. אמצעי הנוחות באי היו מוגבלים או שלא היו קיימים בכלל, והמבקרים הראשונים באי ישנו על החוף או בבתיהם של המקומיים. השמועה על גן העדן הטרופי התפשטה במהירות בקרב המטיילים, ובמהרה הפך פוקט ממקום אותנטי, פסטורלי ולא מתוייר לאתר נופש מסחרי והמוני.\r\nביקור בפוקט, האי הגדול ביותר בתאילנד, יכול להתאים לכל סוג מטייל, תרמילאים יהנו מטרקים בהרים וביערות סביב לחופים.', '2023-04-14', '2023-05-18', '1055', 'image_1681038988499.jpg'),
(17, 'Buenos Aires', 'בואנוס איירס (Buenos Aires), עיר הבירה של ארגנטינה, נותנת הרגשה אירופאית למטיילים בה ואין ספק שזו אחת הערים המדהימות של דרום אמריקה. בואנוס איירס שוכנת על גדות נהר Rio de la Plata ומשמשת בדרך כלל כנקודת עצירה עבור התרמילאים במסעם בין שלל אתרי הטבע, בכדי לשאוף קצת מודרניות. העיר האלגנטית משלבת בין שכונות יוקרה, פארקים רחבי ידיים ורחובות שוקקים, בהם ניצבים מבנים קולוניאליים מהודרים ושווקי סוף שבוע כיפיים לחיי לילה תוססים ומהנים. בבואנוס איירס כדאי לבקר, בין היתר, באזור ריקולטה היפה, בו שכן בית קברות מפורסם, בשכונת פלרמו הבוהמיינית ובשכונת לה בוקה על בתיה הצבעוניים.', '2023-07-01', '2023-07-30', '1150', 'image_1681561323232.jpg'),
(26, 'Santorini', 'סנטוריני, אי בקצה הדרומי של האיים הקיקלידיים, נחשב לאחד הפופולאריים בארכיפלג זה. באי סנטוריני מתגוררים למעלה מ-7,000 בני אדם והוא נבדל מהאיים הקיקלידיים האחרים של יוון בצורותיו הגיאולוגיות, שהינן תוצאה של פעילות געשית, שהאחרונה בהן היתה התפרצות הר הגעש בשנת 1956.\r\nהיום מהווה סנטוריני יעד מועדף על תיירים לחופשה, בעיקר בקיץ. חופיו היפים של האי, הפינות הקסומות, הבתים הלבנים והגגות הכחולים שלהם, האוכל הטוב והאווירה הידידותית והכנסת האורחים, מהווים את עיקר המשיכה לכאן.', '2023-05-16', '2023-05-20', '425', 'image_1681720814868.jpg'),
(27, 'Amsterdam', 'אמסטרדם (Amsterdam) היא בירתה של הולנד ואחד מיעדי התיירות המובילים בעולם. זוהי עיר נוחה מאוד, שכן מרכזה קומפקטי ורוב האתרים המעניינים נמצאים במרחק הליכה זה מזה או במרחק נסיעה קצר בתחבורה ציבורית. תעלות המים היפות של אמסטרדם, הכיכרות והרחובות היפים, האווירה הצעירה והקוסמופוליטית של העיר וניגודים מרתקים שבין ישן לחדש הופכים אותה ליעד חובה, עבור כל תייר בהולנד.', '2023-05-11', '2023-05-19', '642', 'image_1681721034047.jpg'),
(28, 'Bucharest', 'בוקרשט (Bucharest), בירתה של רומניה, שגילה עולה על 500 שנה והאוכלוסייה בה מונה למעלה משני מיליון איש, נחשבה בעברה ל\"פריז הקטנה\" ומאז הפכה לעיר מתויירת ומודרנית. כיום זוהי עיר גדולה ואחת הערים השוקקות והמתויירות במדינה. אפשר למצוא בבוקרשט מגוון של אטרקציות מעניינות כמו בית הפרלמנט, שנחשב לאחד מבנייני הפרלמנט הגדולים בעולם. קווי המטרו תורמים לתנועה מהירה בתוך העיר וחוסכים זמן בהימנעות מפקקים.', '2023-07-12', '2023-07-18', '370', 'image_1681721180146.jpg'),
(29, 'Dubai', 'דובאי (Dubai) היא אחת מבין שבע האמירויות שמרכיבות את איחוד האמירויות הערביות. האמירות, שהיתה בתחילת דרכה כפר דייגים, היא כיום יעד תיירותי מרכזי במזרח התיכון, שמשלב בין האקזוטיות המזרח תיכונית לבין חיי תענוגות קוסמופוליטים ומציע שירותי תיירות מצויינים ובדומה לאבו דאבי הבירה, היא גם אחת הערים הכי פופולאריות לתיירים באיחוד.', '2023-05-05', '2023-05-14', '824', 'image_1681721331476.jpg'),
(30, 'Maldives', 'אי בודד קטן עם חול לבן, ים שקוף ונקי בצבע טורקיז? יש מקום כזה וקוראים לו האיים המלדיביים. קבוצת האיים המונה 1192 איים, שרק כ- 200 מהם מיושבים, שוכנת באוקיינוס ההודי, דרום מערבית לסרי לנקה והתושבים החיים בהם הם בעלי תרבות מגוונת, שהושפעה מהתרבות האפריקנית, הערבית והדרום אסיאתית. אין ספק שזה נשמע כמו מקום מושלם לחופשה- מזג האוויר הטרופי מבטיח שתמיד יהיה חם ולח והמים הצלולים מבטיחים אפשרויות צלילה מרהיבות והתרשמות מהעולם התת ימי העשיר, באחד מאתרי הצלילה הטובים בעולם. ', '2023-07-06', '2023-07-24', '1355', 'image_1681722005442.jpg'),
(31, 'New York', 'ניו יורק, המדינה המובילה בתחומי התרבות, הפוליטיקה והכלכלה בארצות הברית, הצטרפה לברית כמדינה ה -11 ביולי 1788. ניו יורק היא המדינה השלישית בגודלה בארצות הברית, היא מונה 18,976,457 בני אדם ומתפרשת על פני 141,205 קמ\"ר. בירת ניו יורק היא אלבני (Albany), על אף שהעיר ניו יורק היא העיר הגדולה ביותר בארצות הברית. העיר ניו יורק ידועה בשם \"התפוח הגדול\" וידועה כשער הכניסה למהגרים של ארצות הברית. ', '2023-05-01', '2023-05-11', '710', 'image_1681722161143.jpg'),
(32, 'Lisbon', 'העיר ליסבון, בירת פורטוגל, מרוחקת 10 קילומטרים מהחוף המערבי של האוקיינוס האטלנטי. ליסבון זוהי עיר נחמדה ומודרנית, שמציעה מגוון פעילויות למבקר בה. במרכז העיר אפשר לבקר בטירות ומנזרים מימי הביניים ולשוטט ברובע מורי (Moorish), שרחובותיו מפותלים בין סמטאות צרות.\r\n\r\nנסיעה מחוץ לעיר ליסבון מובילה לבלם (Belem), המקום ממנו וסקו דה גמא ואיורס קברל יצאו למסעותיהם. בעיר גם מגדל מפורסם, מנזר Hieronymite, כנסייה מהמאה השתיים עשרה, מוזיאונים, גשר שאורכו 2.5 קילומטרים החולף מעל נהר Tagus וכנסיות המרוצפות משטחים כחולים-לבנים.', '2023-05-12', '2023-05-18', '850', 'image_1681722429523.jpg');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `followers`
--
ALTER TABLE `followers`
  ADD KEY `userID` (`userID`) USING BTREE,
  ADD KEY `vacationsID` (`vacationsID`) USING BTREE;

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `vacations`
--
ALTER TABLE `vacations`
  ADD PRIMARY KEY (`vacID`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=107;

--
-- AUTO_INCREMENT for table `vacations`
--
ALTER TABLE `vacations`
  MODIFY `vacID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=58;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `followers`
--
ALTER TABLE `followers`
  ADD CONSTRAINT `followers_ibfk_1` FOREIGN KEY (`userID`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `followers_ibfk_2` FOREIGN KEY (`vacationsID`) REFERENCES `vacations` (`vacID`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
