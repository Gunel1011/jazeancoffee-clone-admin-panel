# Jazean Coffee Admin Panel - Layihə Təqdimatı

## 1. Layihə Haqqında Ümumi Məlumat
Jazean Coffee Admin Panel, kofe dükanları şəbəkəsi üçün nəzərdə tutulmuş müasir, çevik və təhlükəsiz idarəetmə sistemidir. Layihə həm məhsulların (inventory), həm də istifadəçilərin idarə olunmasını mərkəzləşdirir.

## 2. Texnoloji Stack
Layihənin performanslı və uzunmüddətli olması üçün ən müasir texnologiyalar seçilib:
- **Frontend**: React (Vite ilə sürətli quruluş)
- **Dil**: TypeScript (Tip təhlükəsizliyi və daha az xəta üçün)
- **Styling**: SCSS (Modul və dəyişən əsaslı CSS arxitekturası)
- **Form Management**: React Hook Form + Yup (Validasiya üçün)
- **API**: Axios (Interceptors ilə mərkəzi idarəetmə)
- **Localization**: i18next (Çoxdilli dəstək)

## 3. Layihənin Arxitekturası
Layihə "Modul Əsaslı" (Module-based) struktur üzərində qurulub:
- **Modules**: Hər bir bölmə (Dashboard, Users, Profile, Login) öz daxilində Model, View, Service və Provider-lərə bölünür. Bu, kodun oxunmasını və gələcəkdə genişləndirilməsini asanlaşdırır.
- **Components**: Təkrar istifadə olunan UI elementləri (Sidebar, Header, Layout, Loading).
- **Services/Providers**: API sorğularının məntiqlə ayrılması (Separation of Concerns).

## 4. Təhlükəsizlik və Autentifikasiya
- **JWT Authentication**: Giriş zamanı serverdən alınan Token localStorage-da saxlanılır.
- **Axios Interceptors**: Hər bir sorğuya avtomatik olaraq Authorization header əlavə olunur.
- **Context API (AuthContext)**: İstifadəçi giriş vəziyyəti və profil məlumatları tətbiqin hər yerində eyni anda sinxronlaşır.
- **Protected Routes**: Giriş etməmiş istifadəçilərin admin paneli görməsi Auth Guard vasitəsilə bloklanır.

## 5. Əsas Funksional İmkanlar
### İstifadəçi İdarəetməsi (Users Module)
- İstifadəçilərin listələnməsi, rolların (admin/user) dəyişdirilməsi.
- İstifadəçi statusunun aktiv/deaktiv edilməsi.
- **Təhlükəsiz Silmə**: İstifadəçi silinərkən adminin email-inə OTP kod göndərilir və yalnız təsdiqdən sonra silmə baş tutur.

### Məhsul İdarəetməsi (Dashboard Module)
- Yeni kofe növlərinin əlavə edilməsi, redaktəsi və silinməsi.
- Şəkillərin dinamik yüklənməsi və idarə olunması.

### Profil və Parametrlər
- Şəxsi məlumatların və profil şəklinin yenilənməsi.
- Şifrənin dəyişdirilməsi və **Şifrəni unutmusunuz?** (OTP ilə bərpa) axını.

## 6. Dizayn və UX (User Experience)
- **Responsive Dizayn**: Panel həm desktop, həm də mobil cihazlarda tam uyğun (responsive) çalışır.
- **Brend Rəngləri**: Kofe mövzusuna uyğun xüsusi rəng palitrası ($custom-rust, $custom-beige) və qaranlıq/aydınlıq balansı.
- **Bildirişlər**: Hər bir əməliyyat üçün istifadəçiyə real-vaxtda feedback verən (Toast) bildirişlər.

## 7. Yekun
Bu panel istənilən sayda məhsul və istifadəçini idarə edə biləcək miqyaslanma imkanlarına malikdir. Kod təmizliyi (clean code) və modul struktur gələcək inkişaf üçün möhkəm bünövvə yaradır.
