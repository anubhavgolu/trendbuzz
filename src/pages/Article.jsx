import { Link, useLocation, useParams } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { useMemo, useEffect, useState } from "react";
import SEO from "../components/SEO"; // path apne hisaab se

/* =======================
   DUMMY ARTICLE DATA
   (API-ready structure)
======================= */
const article = {
  category: "health",
  publishedAt: "Jan 9, 2026",
  en: {
    title: "Why do women experience more knee pain than men?",
    excerpt:
      "Women are more prone to knee pain than men due to anatomy, hormones and lifestyle.",
    content: `<h2 id="summary">Summary</h2>
<p>
Knee-related problems are more commonly observed in women than in men.
Several factors contribute to this, including physical structure, hormonal
changes, walking patterns, and lifestyle habits. In this article, we will
explore in detail why women experience knee pain more frequently, the
conditions that worsen this problem, and the preventive measures that can
help reduce the risk.
</p>

<h2 id="is-it-true">Is it really true that knee problems are more common in women?</h2>
<p>
If you are wondering whether this claim is true, there is solid data to
support it. According to various medical studies, women are nearly
<strong>2 to 8 times</strong> more likely than men to experience knee pain
and knee injuries.
</p>
<p>
Research published by institutions such as the National Library of Medicine
confirms this fact. However, it is important to understand that frequent or
persistent knee pain is not normal. If a woman experiences knee pain for a
long time or if the pain keeps increasing, she should consult an experienced
orthopedic specialist without delay.
</p>

<h2 id="why-more-pain">Why do women experience more knee pain?</h2>
<p>
There are several reasons behind knee pain in women. Let’s understand them
one by one.
</p>

<h3 id="body-structure">1. Body structure</h3>
<p>
There are clear differences between the physical structures of women and men.
Generally, women have wider hips, which increases the
<strong>Q-angle</strong>.
</p>
<p>
An increased Q-angle puts extra stress on the knees while walking, increasing
the likelihood of pain. This is why injuries such as
<strong>ACL (Anterior Cruciate Ligament)</strong> tears are more common in women.
</p>

<h3 id="hormonal-changes">2. Hormonal changes</h3>
<p>
Hormonal fluctuations play an important role in knee pain among women.
Estrogen levels change during the menstrual cycle, pregnancy, and menopause.
</p>
<p>
These hormonal changes can affect ligament strength and cause joint laxity,
increasing the risk of injury.
</p>

<h3 id="gait-pattern">3. Walking pattern (Gait pattern)</h3>
<p>
Due to differences in body structure, the walking pattern of women is slightly
different from that of men. This can lead to uneven stress on the knees and
joints.
</p>
<p>
Additionally, factors such as body weight, BMI, muscle weakness, and fatigue
can affect gait, leading to conditions like
<strong>osteoarthritis</strong> and
<strong>patellofemoral pain syndrome</strong>.
</p>

<h3 id="footwear">4. Footwear choice</h3>
<p>
Many women prefer wearing high heels for long periods. High heels alter body
balance and place extra pressure on the knees.
</p>
<p>
Over time, this habit can worsen knee pain and joint-related problems.
</p>

<h3 id="pregnancy">5. Pregnancy</h3>
<p>
Pregnancy can also be a major cause of knee pain in women, which is explained
in detail below.
</p>

<h2 id="pregnancy-menopause">Knee problems during pregnancy and menopause</h2>

<h3 id="pregnancy-phase">During pregnancy</h3>
<p>
Several changes occur in the body during pregnancy:
</p>
<ul>
  <li>Rapid weight gain</li>
  <li>Hormonal changes</li>
  <li>Ligaments become looser</li>
</ul>
<p>
All of these factors put extra stress on the knee joints, leading to pain and
instability.
</p>

<h3 id="menopause-phase">During menopause</h3>
<p>
During menopause, estrogen levels decrease. As a result:
</p>
<ul>
  <li>Ligaments may become weaker</li>
  <li>Cartilage may get damaged</li>
</ul>
<p>
These changes increase the risk of osteoarthritis and knee injuries in women.
</p>

<h2 id="prevention">Easy ways to prevent knee problems</h2>
<p>
If you are troubled by knee pain, following the measures below can
significantly reduce the risk.
</p>

<ul>
  <li>
    <strong>Maintain a healthy BMI:</strong>
    A healthy weight reduces excess pressure on the knees.
  </li>
  <li>
    <strong>Wear the right footwear:</strong>
    Choose shoes that fit well and provide proper arch support. Avoid high
    heels.
  </li>
  <li>
    <strong>Do low-impact exercises:</strong>
    Activities like swimming, cycling, and yoga are beneficial for the knees.
  </li>
  <li>
    <strong>Strengthen muscles:</strong>
    Strengthening the hamstrings and quadriceps provides better support to the
    knees.
  </li>
  <li>
    <strong>Warm-up and stretch:</strong>
    This helps maintain muscle flexibility and reduces the risk of injury.
  </li>
  <li>
    <strong>Maintain proper posture:</strong>
    Correct posture helps distribute body weight evenly.
  </li>
  <li>
    <strong>Include strength training:</strong>
    Strength training strengthens bones and joints.
  </li>
</ul>

<h2 id="conclusion">Conclusion</h2>
<p>
Knee pain in women can be related to body structure, hormonal changes, and
lifestyle factors. Wearing the right shoes, maintaining a healthy weight, and
exercising regularly can help prevent this problem.
</p>
<p>
If the pain persists or worsens, timely consultation with a specialist is
extremely important.
</p>

<h2 id="faqs">Frequently Asked Questions (FAQs)</h2>

<h3 id="faq-shoes">How do wrong shoes worsen knee problems?</h3>
<p>
Improper or unsupportive footwear places uneven pressure on the feet and
knees, increasing pain and related issues.
</p>

<h3 id="faq-osteoarthritis">Why do women have a higher risk of osteoarthritis?</h3>
<p>
Hormonal changes, especially after menopause, increase the risk of
osteoarthritis in women.
</p>

<h3 id="faq-age">Does knee pain increase with age?</h3>
<p>
Yes, with increasing age, muscle weakness, cartilage wear, and hormonal
changes raise the likelihood of knee pain.
</p>

<h3 id="faq-nutrition">Which nutrients are important for knee health?</h3>
<p>
Calcium, vitamin D, and omega-3 fatty acids are essential for strong bones
and healthy joints.
</p>

<h3 id="faq-genetic">Can knee problems be genetic?</h3>
<p>
Yes, if there is a family history of osteoarthritis or ligament-related
problems, the risk can be higher.
</p>
`,
  },

  hi: {
    title: "महिलाओं में घुटने का दर्द पुरुषों की तुलना में अधिक क्यों होता है?",
    excerpt:
      "महिलाओं में घुटने की समस्या पुरुषों की तुलना में अधिक क्यों होती है? जानिए इसके कारण, प्रेगनेंसी और मेनोपॉज से जुड़ी समस्याएं और बचाव के उपाय।",
    content: `
    <h2 id="summary">Summary</h2>
<p>
महिलाओं में घुटने से जुड़ी समस्याएं पुरुषों की तुलना में अधिक देखी जाती हैं।
इसके पीछे शारीरिक संरचना, हार्मोनल बदलाव, चलने का तरीका और जीवनशैली जैसे कई कारण
जिम्मेदार होते हैं। इस लेख में हम विस्तार से जानेंगे कि महिलाओं को घुटने का दर्द
अधिक क्यों होता है, किन परिस्थितियों में यह समस्या बढ़ जाती है और इससे बचाव के
लिए कौन-कौन से उपाय अपनाए जा सकते हैं।
</p>

<h2 id="is-it-true">क्या वाकई महिलाओं में घुटने की समस्या अधिक होती है?</h2>
<p>
यदि आप सोच रहे हैं कि क्या यह दावा सही है, तो इसके पीछे ठोस आंकड़े मौजूद हैं।
विभिन्न मेडिकल रिसर्च के अनुसार, महिलाओं में घुटने के दर्द और विशेष रूप से घुटने
की चोटों की संभावना पुरुषों की तुलना में लगभग <strong>2 से 8 गुना</strong> अधिक
होती है।
</p>
<p>
नेशनल लाइब्रेरी ऑफ मेडिसिन जैसी संस्थाओं द्वारा प्रकाशित शोध इस बात की पुष्टि
करते हैं। हालांकि, यह समझना जरूरी है कि घुटने का बार-बार या लगातार दर्द होना
सामान्य स्थिति नहीं है। यदि किसी महिला को लंबे समय तक घुटने में दर्द रहता है या
दर्द बढ़ता जा रहा है, तो बिना देर किए किसी अनुभवी हड्डी रोग विशेषज्ञ से परामर्श
लेना चाहिए।
</p>

<h2 id="why-more-pain">महिलाओं में घुटने का दर्द अधिक क्यों होता है?</h2>
<p>
महिलाओं में घुटने के दर्द के पीछे कई कारण होते हैं। आइए इन्हें एक-एक करके समझते
हैं।
</p>

<h3 id="body-structure">1. शारीरिक बनावट</h3>
<p>
महिलाओं और पुरुषों की शारीरिक संरचना में स्पष्ट अंतर होता है। आमतौर पर महिलाओं
के कूल्हे चौड़े होते हैं, जिससे <strong>क्यू-एंगल (Q-Angle)</strong> अधिक हो
जाता है।
</p>
<p>
क्यू-एंगल बढ़ने से चलते समय घुटनों पर अतिरिक्त दबाव पड़ता है, जिससे दर्द की
संभावना बढ़ जाती है। यही कारण है कि महिलाओं में
<strong>ACL (एंटीरियर क्रूसिएट लिगामेंट)</strong> जैसी चोटें अधिक देखी जाती
हैं।
</p>

<h3 id="hormonal-changes">2. हार्मोनल परिवर्तन</h3>
<p>
महिलाओं के शरीर में हार्मोनल उतार-चढ़ाव घुटने के दर्द में अहम भूमिका निभाता है।
एस्ट्रोजन हार्मोन का स्तर पीरियड साइकिल, प्रेगनेंसी और मेनोपॉज के दौरान बदलता
रहता है।
</p>
<p>
इन हार्मोनल परिवर्तनों के कारण लिगामेंट की मजबूती प्रभावित होती है और जोड़ों में
ढीलापन आ सकता है, जिससे चोट लगने का खतरा बढ़ जाता है।
</p>

<h3 id="gait-pattern">3. चलने का तरीका (Gait Pattern)</h3>
<p>
शारीरिक बनावट के कारण महिलाओं का चलने का तरीका पुरुषों से थोड़ा अलग होता है।
इससे घुटनों और जोड़ों पर असमान दबाव पड़ सकता है।
</p>
<p>
इसके अलावा वजन, बीएमआई, मांसपेशियों की कमजोरी और थकान भी महिलाओं की चाल को
प्रभावित करते हैं, जिससे <strong>ऑस्टियोआर्थराइटिस</strong> और
<strong>पेटेलोफीमोरल पेन सिंड्रोम</strong> जैसी समस्याएं उत्पन्न हो सकती हैं।
</p>

<h3 id="footwear">4. जूतों का चयन</h3>
<p>
कई महिलाएं लंबे समय तक हाई हील्स पहनना पसंद करती हैं। हाई हील्स पहनने से शरीर
का संतुलन बदल जाता है और घुटनों पर अतिरिक्त दबाव पड़ता है।
</p>
<p>
समय के साथ यह आदत घुटने के दर्द और जोड़ों की समस्याओं को गंभीर बना सकती है।
</p>

<h3 id="pregnancy">5. प्रेगनेंसी</h3>
<p>
प्रेगनेंसी भी महिलाओं में घुटने के दर्द का एक प्रमुख कारण हो सकती है, जिसके बारे
में आगे विस्तार से बताया गया है।
</p>

<h2 id="pregnancy-menopause">प्रेगनेंसी और मेनोपॉज के दौरान घुटने की समस्याएं</h2>

<h3 id="pregnancy-phase">प्रेगनेंसी के दौरान</h3>
<p>
गर्भावस्था के दौरान शरीर में कई बदलाव होते हैं:
</p>
<ul>
  <li>वजन तेजी से बढ़ता है</li>
  <li>हार्मोनल परिवर्तन होते हैं</li>
  <li>लिगामेंट ढीले हो जाते हैं</li>
</ul>
<p>
इन सभी कारणों से घुटनों के जोड़ों पर अतिरिक्त तनाव पड़ता है, जिससे दर्द और
अस्थिरता की समस्या उत्पन्न हो सकती है।
</p>

<h3 id="menopause-phase">मेनोपॉज के दौरान</h3>
<p>
मेनोपॉज के समय एस्ट्रोजन हार्मोन का स्तर कम हो जाता है। इसके परिणामस्वरूप:
</p>
<ul>
  <li>लिगामेंट कमजोर हो सकते हैं</li>
  <li>कार्टिलेज को नुकसान पहुंच सकता है</li>
</ul>
<p>
इन कारणों से महिलाओं में ऑस्टियोआर्थराइटिस और घुटने की चोटों का खतरा बढ़ जाता
है।
</p>

<h2 id="prevention">घुटने की समस्याओं से बचने के आसान उपाय</h2>
<p>
यदि आप घुटने के दर्द से परेशान हैं, तो नीचे दिए गए उपाय अपनाकर जोखिम को काफी
हद तक कम किया जा सकता है।
</p>

<ul>
  <li>
    <strong>स्वस्थ BMI बनाए रखें:</strong>
    स्वस्थ वजन घुटनों पर पड़ने वाले अतिरिक्त दबाव को कम करता है।
  </li>
  <li>
    <strong>सही जूते पहनें:</strong>
    ऐसे जूते चुनें जो सही फिट हों और पर्याप्त आर्च सपोर्ट दें। हाई हील्स से बचें।
  </li>
  <li>
    <strong>कम प्रभाव वाले व्यायाम करें:</strong>
    स्विमिंग, साइकिलिंग और योग जैसी गतिविधियां घुटनों के लिए फायदेमंद होती हैं।
  </li>
  <li>
    <strong>मांसपेशियों को मजबूत करें:</strong>
    हैमस्ट्रिंग और क्वाड्रिसेप्स को मजबूत करने से घुटनों को बेहतर सहारा मिलता है।
  </li>
  <li>
    <strong>वार्म-अप और स्ट्रेचिंग करें:</strong>
    इससे मांसपेशियों में लचीलापन बना रहता है और चोट का खतरा कम होता है।
  </li>
  <li>
    <strong>सही मुद्रा बनाए रखें:</strong>
    सही पोस्चर से शरीर का वजन समान रूप से वितरित होता है।
  </li>
  <li>
    <strong>शक्ति प्रशिक्षण शामिल करें:</strong>
    स्ट्रेंथ ट्रेनिंग हड्डियों और जोड़ों को मजबूत बनाती है।
  </li>
</ul>

<h2 id="conclusion">निष्कर्ष</h2>
<p>
महिलाओं में घुटने का दर्द शारीरिक बनावट, हार्मोनल बदलाव और जीवनशैली से जुड़ा
हो सकता है। सही जूते पहनना, स्वस्थ वजन बनाए रखना और नियमित व्यायाम करना इस
समस्या से बचाव में मदद करता है।
</p>
<p>
यदि दर्द लगातार बना रहे या बढ़ता जाए, तो समय पर विशेषज्ञ से परामर्श लेना बेहद
जरूरी है।
</p>

<h2 id="faqs">अक्सर पूछे जाने वाले प्रश्न (FAQs)</h2>

<h3 id="faq-shoes">गलत जूते पहनने से घुटने की समस्या कैसे बढ़ती है?</h3>
<p>
गलत या बिना सपोर्ट वाले जूते पैरों और घुटनों पर असंतुलित दबाव डालते हैं, जिससे
दर्द और अन्य समस्याएं बढ़ सकती हैं।
</p>

<h3 id="faq-osteoarthritis">महिलाओं को ऑस्टियोआर्थराइटिस का अधिक जोखिम क्यों होता है?</h3>
<p>
हार्मोनल बदलाव, खासकर मेनोपॉज के बाद, महिलाओं में ऑस्टियोआर्थराइटिस के जोखिम
को बढ़ा देते हैं।
</p>

<h3 id="faq-age">क्या उम्र के साथ घुटने का दर्द बढ़ता है?</h3>
<p>
हां, उम्र बढ़ने के साथ मांसपेशियों की कमजोरी, कार्टिलेज का घिसना और हार्मोनल
परिवर्तन घुटने के दर्द की संभावना बढ़ा देते हैं।
</p>

<h3 id="faq-nutrition">घुटनों के लिए कौन से पोषक तत्व जरूरी हैं?</h3>
<p>
कैल्शियम, विटामिन D और ओमेगा-3 फैटी एसिड मजबूत हड्डियों और स्वस्थ जोड़ों के लिए
बेहद जरूरी हैं।
</p>

<h3 id="faq-genetic">क्या घुटने की समस्याएं आनुवंशिक हो सकती हैं?</h3>
<p>
हां, यदि परिवार में पहले से ऑस्टियोआर्थराइटिस या लिगामेंट से जुड़ी समस्याएं
रही हैं, तो जोखिम बढ़ सकता है।
</p>

  `,
  },
};

/* =======================
   HELPER: Extract Headings
======================= */
function extractHeadings(html) {
  if (!html) return [];
  const parser = new DOMParser();
  const doc = parser.parseFromString(html, "text/html");

  return [...doc.querySelectorAll("h2, h3")].map((h) => ({
    id: h.id,
    text: h.textContent,
    level: h.tagName,
  }));
}

export default function Article() {
  const { slug } = useParams();
  const location = useLocation();

  // ✅ Language STATE (URL se nahi)
  const [lang, setLang] = useState("en");
  const isHindi = lang === "hi";

  // ✅ Article select
  const currentArticle = article[lang];

  if (!currentArticle) {
    return <div className="p-6">Article not found</div>;
  }

  // ✅ Scroll to top on language change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [lang]);

  // ✅ Extract headings
  const headings = useMemo(
    () => extractHeadings(currentArticle.content),
    [currentArticle.content]
  );

  return (
    <>
      <SEO
        title={`${currentArticle.title} | TrendBuzz`}
        description={currentArticle.excerpt}
        canonical="https://www.trendbuzzs.com/article"
        image={article.image}
      />

      <Helmet>
        <html lang={isHindi ? "hi" : "en"} />
        <title>{currentArticle.title} | TrendBuzz</title>
        <meta name="description" content={currentArticle.excerpt} />
      </Helmet>

      <div className="max-w-7xl mx-auto px-4 pt-4 h-[calc(100vh-56px)]">
        {/* TOP BAR */}
        <div className="flex items-center justify-between mb-6">
          <Link to="/" className="text-sm text-gray-600 hover:text-orange-600">
            ← Back to Home
          </Link>

          {/* ✅ LANGUAGE SWITCH — REAL FIX */}
          <button
            onClick={() => setLang(isHindi ? "en" : "hi")}
            className="relative inline-flex items-center bg-gray-100 rounded-full w-28 h-8 overflow-hidden"
          >
            <span
              className={`absolute h-8 w-1/2 bg-orange-500 transition-transform ${
                isHindi ? "translate-x-full" : ""
              }`}
            />
            <span className="relative z-10 w-1/2 text-center text-xs font-semibold">
              EN
            </span>
            <span className="relative z-10 w-1/2 text-center text-xs font-semibold">
              हिंदी
            </span>
          </button>
        </div>

        {/* GRID */}
        <div className="lg:grid lg:grid-cols-[220px_1fr] lg:gap-12 h-full">
          {/* OUTLINE */}
          <aside className="hidden lg:block sticky top-20">
            <div className="pl-4 border-l">
              <p className="mb-3 text-xs font-semibold uppercase text-gray-500">
                On this page
              </p>

              <ul className="space-y-2 text-sm">
                {headings.map((h) => (
                  <li key={h.id} className={h.level === "H3" ? "ml-4" : ""}>
                    <a
                      href={`#${h.id}`}
                      className="text-gray-600 hover:text-orange-600"
                    >
                      {h.text}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </aside>

          {/* ARTICLE */}
          <article className="max-w-3xl h-full overflow-y-auto pr-3 custom-scroll">
            <header className="mb-6">
              <h1 className="text-3xl font-bold leading-tight relative top-[4px]">
                {currentArticle.title}
              </h1>

              <div className="mt-3 text-sm text-gray-500 flex gap-2">
                <span>TrendBuzz</span>
                <span>•</span>
                <time>{article.publishedAt}</time>
                <span>•</span>
                <span className="capitalize">{article.category}</span>
              </div>
            </header>

            <img
              src="/kneePain.jpg"
              alt={currentArticle.title}
              width="1200"
              height="630"
              className="w-full rounded-xl mb-8"
              loading="lazy"
            />

            <section
              className="
                prose prose-lg max-w-none text-gray-800
                prose-p:leading-relaxed
                prose-p:my-4
                prose-ul:my-6
                prose-ul:pl-6
                prose-li:my-3
                prose-li:leading-relaxed
                prose-li::marker:text-orange-500
                prose-li::marker:text-lg
              "
              dangerouslySetInnerHTML={{
                __html: currentArticle.content,
              }}
            />

            <div className="mt-10">
              <Link
                to={`/category/${article.category}`}
                className="inline-block px-3 py-1 text-xs rounded-full bg-orange-50 text-orange-600"
              >
                #{article.category}
              </Link>
            </div>
          </article>
        </div>
      </div>
    </>
  );
}
