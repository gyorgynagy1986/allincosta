document.addEventListener('DOMContentLoaded', function () {

    const isMobile = window.innerWidth <= 767;
    const isTablet = window.innerWidth <= 1023;

    // GSAP

    gsap.registerPlugin(ScrollTrigger);
    gsap.config({ nullTargetWarn: false });

    // Lenis

    const lenis = new Lenis({
        duration: 0.8,
    })

    lenis.on('scroll', ScrollTrigger.update)

    gsap.ticker.add((time) => {
        lenis.raf(time * 1000)
    })

    gsap.ticker.lagSmoothing(0)

    // function raf(time) {
    //     lenis.raf(time)
    //     requestAnimationFrame(raf)
    // }

    // requestAnimationFrame(raf)

    // Loader

    let loaded = false;
    let loader = document.querySelector('.loader');

    if (sessionStorage.getItem("loaded") && document.querySelector('.loader')) {
        document.querySelector('.loader').style.display = 'none';
        loaded = true;
    }

    if (!document.querySelector('.loader')) {
        loaded = true;
    }

    setTimeout(function () {
        $('body').css('opacity', '1');
    }, 300);

    if (loader) {
        setTimeout(function () {
            loader.classList.add('end');
            setTimeout(function () {
                document.querySelector('.loader').style.display = 'none';
            }, 1000);
            loaded = true;
            sessionStorage.setItem("loaded", true);
            // document.querySelector('.rccookie-container').classList.add('active');
        }, 3000);
    }

    // Kezdő animációk

    const triggerOptions = {
        start: isMobile ? 'top 86%' : 'top 78%',
        toggleActions: 'play none none none',
    };

    let isAnimated = true;

    if (isAnimated) {
        setAnimations();
    }

    function setAnimations() {

        const power3 = {
            opacity: 0,
            ease: 'power3.out',
            duration: 1.1,
            stagger: 0.15,
        }

        const fadeInY = {
            y: 35,
            ...power3
        };

        const fadeInYDown = {
            y: isMobile ? -25 : -50,
            ...power3
        };

        const fadeInXLeft = {
            x: isMobile ? -25 : -50,
            ...power3
        };

        const fadeInXRight = {
            x: isMobile ? 25 : 50,
            ...power3
        };

        setTimeout(function () {

            gsap.from(".desktop-navbar, .mobilmenu", {
                y: isMobile ? -40 : -60,
                opacity: 0,
                duration: 0.8,
                ease: 'power2.out',
                delay: 0.2,
            });

            gsap.from('.hero h1, .hero h2, .hero a, .breadcrumbs', {
                ...fadeInXLeft,
                delay: 0.2,
            });

            gsap.from('.hero .bg', {
                scale: 1.1,
                duration: 4,
                ease: 'power1.out',
                delay: 0.2,
            });
            // ScrollTrigger animációk
    
            document.querySelectorAll('.items').forEach((items) => {
                let numberOfItems = 0;                

                switch (items.classList[1]) {
                    case 'two':
                        numberOfItems = 2;
                        break;
                    case 'three':
                        numberOfItems = 3;
                        break;
                    case 'four':
                        numberOfItems = 4;
                        break;
                    case 'six':
                        numberOfItems = 6;
                        break;
                    default:
                        numberOfItems = 3;
                        break;
                }

                items.querySelectorAll('&>.item').forEach((item, index) => {
                    gsap.from(item, {
                        scrollTrigger: {
                            trigger: item,
                            ...triggerOptions,
                        },
                        ...fadeInY,
                        delay: isMobile ? 0 :
                            isTablet ? index % 2 * 0.15 :
                                index % numberOfItems * 0.15,
                    });
                });                

                if (items.nextElementSibling && items.nextElementSibling.tagName === 'A') {
                    gsap.from(items.nextElementSibling, {
                        scrollTrigger: {
                            trigger: items.nextElementSibling,
                            ...triggerOptions,
                        },
                        ...fadeInY,
                        delay: 0.15,
                    });
                }

            });

            // H2-k

            const excludedH2s = `
                .hero h2,
                .about h2,
                .article h2,
                .contact h2,
                .project-content h2,
                .second-project-content h2
            `

            document.querySelectorAll(`h2:not(${excludedH2s})`).forEach((h2) => {
                gsap.from(h2, {
                    scrollTrigger: {
                        trigger: h2,
                        ...triggerOptions,
                    },
                    ...fadeInXLeft,
                });

                if (h2.nextElementSibling && h2.nextElementSibling.tagName === 'H3') {
                    gsap.from(h2.nextElementSibling, {
                        scrollTrigger: {
                            trigger: h2,
                            ...triggerOptions,
                        },
                        ...fadeInXLeft,
                        delay: 0.15,
                    });
                }

            });

            document.querySelectorAll('.bgshape').forEach((bgshape) => {
                gsap.to(bgshape.querySelectorAll('path'), {
                    scrollTrigger: {
                        trigger: bgshape,
                        ...triggerOptions,
                    },
                    strokeDashoffset: "-25%",
                    strokeDasharray: "15% 0",
                    duration: 2.25,
                    ease: 'power2.out',
                });

                gsap.to(bgshape.querySelectorAll('path'), {
                    scrollTrigger: {
                        trigger: bgshape,
                        ...triggerOptions,
                    },
                    fillOpacity: 1,
                    duration: 0.7,
                    ease: 'power2.out',
                    delay: 1.75,
                });
            });

            document.querySelectorAll('.intro').forEach((intro) => {

                gsap.from(intro.querySelectorAll('.fancy li'), {
                    scrollTrigger: {
                        trigger: intro.querySelector('.fancy'),
                        ...triggerOptions,
                    },
                    ...fadeInXLeft,
                    stagger: 0.05,
                });


                gsap.from(intro.querySelectorAll('h3, h4, p, a'), {
                    scrollTrigger: {
                        trigger: intro.querySelector('h3'),
                        ...triggerOptions,
                    },
                    ...fadeInY,
                    stagger: 0.1,
                });

            });

            gsap.from('.about', {
                scrollTrigger: {
                    trigger: '.about',
                    ...triggerOptions,
                },
                opacity: 0,
                duration: 0.7,
            });

            gsap.from('.about .left', {
                scrollTrigger: {
                    trigger: '.about .left',
                    ...triggerOptions,
                },
                ...fadeInXLeft,
            });

            gsap.from('.about .right', {
                scrollTrigger: {
                    trigger: '.about .right',
                    ...triggerOptions,
                },
                ...fadeInXRight,
            });

            gsap.from('.about .right img', {
                scrollTrigger: {
                    trigger: '.about .right img',
                    ...triggerOptions,
                },
                scale: 1.25,
                duration: 2.125,
                ease: 'power1.out',
            });

            document.querySelectorAll('.services .item').forEach((item, index) => {
                if (index % 2 === 0) {
                    gsap.from(item.querySelector('.left'), {
                        scrollTrigger: {
                            trigger: item.querySelector('.left'),
                            ...triggerOptions,
                        },
                        ...fadeInXLeft,
                    });

                    gsap.from(item.querySelectorAll('.right > *'), {
                        scrollTrigger: {
                            trigger: item.querySelector('.right'),
                            ...triggerOptions,
                        },
                        ...fadeInXRight,
                        stagger: 0.1,
                    });
                } else {
                    gsap.from(item.querySelector('.left'), {
                        scrollTrigger: {
                            trigger: item.querySelector('.left'),
                            ...triggerOptions,
                        },
                        ...fadeInXRight,
                    });

                    gsap.from(item.querySelectorAll('.right > *'), {
                        scrollTrigger: {
                            trigger: item.querySelector('.right'),
                            ...triggerOptions,
                        },
                        ...fadeInXLeft,
                        stagger: 0.1,
                    });
                }

                gsap.from(item.querySelector('.left img'), {
                    scrollTrigger: {
                        trigger: item.querySelector('.left img'),
                        ...triggerOptions,
                    },
                    scale: 1.125,
                    duration: 2,
                    ease: 'power1.out',
                });

            });

            gsap.from('.reviews', {
                scrollTrigger: {
                    trigger: '.reviews',
                    ...triggerOptions,
                },
                opacity: 0,
                duration: 0.7,
            });

            gsap.from('.reviews .quote, .reviews .relative', {
                scrollTrigger: {
                    trigger: '.reviews .quote',
                    ...triggerOptions,
                },
                ...fadeInY,
                stagger: 0.25,
            });

            gsap.from('.faq .collapse-item, .faq .primary-link', {
                scrollTrigger: {
                    trigger: '.faq .collapse-item',
                    ...triggerOptions,
                },
                ...fadeInY,
                stagger: 0,
            });

            gsap.from('.contact', {
                scrollTrigger: {
                    trigger: '.contact',
                    ...triggerOptions,
                },
                opacity: 0,
                delay: 0.15,
                duration: 0.8,
            });

            gsap.from('footer .item', {
                scrollTrigger: {
                    trigger: 'footer .item',
                    ...triggerOptions,
                    start: 'top 92%',
                },
                ...fadeInY,
            });

            gsap.from('.about-2 .bg', {
                scrollTrigger: {
                    trigger: '.about-2 .bg',
                    ...triggerOptions,
                },
                ...fadeInXLeft,
            });

            gsap.from('.about-2 .card', {
                scrollTrigger: {
                    trigger: '.about-2 .card',
                    ...triggerOptions,
                },
                ...fadeInXRight,
            });

            gsap.from('.about-2 + .primary-link', {
                scrollTrigger: {
                    trigger: '.about-2 + .primary-link',
                    ...triggerOptions,
                },
                ...fadeInY,
            });

            gsap.from('.services .primary-link.center', {
                scrollTrigger: {
                    trigger: '.services .primary-link.center',
                    ...triggerOptions,
                },
                ...fadeInY,
            });

            document.querySelectorAll('.small-content').forEach((section, index) => {
                if (index % 2 === 0) {
                    gsap.from(section.querySelector('.left'), {
                        scrollTrigger: {
                            trigger: section.querySelector('.left'),
                            ...triggerOptions,
                        },
                        ...fadeInXLeft,
                    });

                    gsap.from(section.querySelector('.right'), {
                        scrollTrigger: {
                            trigger: section.querySelector('.right'),
                            ...triggerOptions,
                        },
                        ...fadeInXRight,
                    });
                }
                else {
                    gsap.from(section.querySelector('.left'), {
                        scrollTrigger: {
                            trigger: section.querySelector('.left'),
                            ...triggerOptions,
                        },
                        ...fadeInXRight,
                    });

                    gsap.from(section.querySelector('.right'), {
                        scrollTrigger: {
                            trigger: section.querySelector('.right'),
                            ...triggerOptions,
                        },
                        ...fadeInXLeft,
                    });
                }

                gsap.from(section.querySelector('.primary-link.center'), {
                    scrollTrigger: {
                        trigger: section.querySelector('.primary-link.center'),
                        ...triggerOptions,
                    },
                    ...fadeInY,
                });
            });

            document.querySelectorAll('.steps .item').forEach((item, index) => {                
                if (item.previousElementSibling && item.previousElementSibling.tagName === 'DIV') {
                    gsap.from(item.previousElementSibling.querySelector('.line'), {
                        scrollTrigger: {
                            trigger: item,
                            ...triggerOptions,
                        },
                        height: 0,
                        duration: 1,
                        ease: 'power3.out',
                    });
                }

                if (index % 2 !== 0 && !isTablet) {
                    gsap.from(item.querySelector('.content'), {
                        scrollTrigger: {
                            trigger: item.querySelector('.content'),
                            ...triggerOptions,
                        },
                        ...fadeInXRight,
                        onStart: () => {
                            item.classList.add('active');
                        },
                    });
                }
                else {
                    gsap.from(item.querySelector('.content'), {
                        scrollTrigger: {
                            trigger: item.querySelector('.content'),
                            ...triggerOptions,
                        },
                        ...fadeInXLeft,
                        onStart: () => {
                            item.classList.add('active');
                        },
                    });
                }
            });

            gsap.from('.steps .primary-link.center', {
                scrollTrigger: {
                    trigger: '.steps .primary-link.center',
                    ...triggerOptions,
                },
                ...fadeInY,
            });

            gsap.from('.list ul', {
                scrollTrigger: {
                    trigger: '.list ul',
                    ...triggerOptions,
                },
                ...fadeInY,
            });

        }, loaded ? 250 : 3000);

    }
});



// Accordion functionality
document.addEventListener('DOMContentLoaded', function() {
  const accordionTriggers = document.querySelectorAll('.accordion-trigger');
  
  accordionTriggers.forEach(trigger => {
    trigger.addEventListener('click', function() {
      const targetId = this.getAttribute('data-target');
      const content = document.getElementById(targetId);
      const icon = this.querySelector('.accordion-icon');
      
      // Toggle content visibility
      if (content.style.display === 'none' || content.style.display === '') {
        content.style.display = 'block';
        icon.textContent = '−';
        icon.style.transform = 'rotate(0deg)';
      } else {
        content.style.display = 'none';
        icon.textContent = '+';
        icon.style.transform = 'rotate(0deg)';
      }
    });
  });
});