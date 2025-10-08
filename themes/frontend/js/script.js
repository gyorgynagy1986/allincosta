$(document).ready(function () {
  // Állandó

  let isMobile = window.innerWidth < 768;
  let isTablet = window.innerWidth < 1024;
  let isNoHeader =
    document.querySelector(".service-hero") ??
    document.querySelector(".project-hero");

  if (isNoHeader) {
    document.querySelector(".desktop-navbar").classList.add("scrolled");
  }

  // VenoBox

  new VenoBox({
    selector: ".venobox",
    spinner: "pulse",
    fitViewPort: true,
    fitView: true,
    fullscreen: true,
    infinigall: true,
  });

  // Swiperek

  let reviewSwiper = new Swiper(".reviewSwiper", {
    slidesPerView: 1,
    spaceBetween: 30,
    speed: 600,
    loop: true,
    autoplay: {
      delay: 8000,
      pauseOnMouseEnter: true,
      disableOnInteraction: true,
    },
    navigation: {
      nextEl: ".reviews .next",
      prevEl: ".reviews .prev",
    },
  });

  // A form-check-re kattintva a form-check input checked lesz

  document.querySelectorAll(".form-check").forEach(function (check) {
    check.addEventListener("click", function () {
      if (check.querySelector("input").checked) {
        check.querySelector("input").checked = false;
      } else check.querySelector("input").checked = true;
    });
  });

  // Ne mutassa a title-t a hivatkozásoknál, ha rávisszük az egeret

  document.querySelectorAll("a").forEach(function (link) {
    let title = link.getAttribute("title");
    link.addEventListener("mouseover", function () {
      link.setAttribute("title", "");
    });
    link.addEventListener("mouseout", function () {
      link.setAttribute("title", title);
    });
  });

  // Görgetésnél navbar class hozzáadása

  if (window.scrollY > 100) {
    document.querySelector(".desktop-navbar").classList.add("scrolled");
  }

  let lastScrollTop = 0;

  window.addEventListener("scroll", function () {
    let currentScroll = window.scrollY || document.documentElement.scrollTop;

    if (!$(".navbar-dropdown").hasClass("active")) {
      if (currentScroll > lastScrollTop) {
        document.querySelector(".desktop-navbar").classList.add("active");
      } else {
        document.querySelector(".desktop-navbar").classList.remove("active");
      }
    }

    lastScrollTop = currentScroll <= 0 ? 0 : currentScroll;

    if (!isNoHeader) {
      if (window.scrollY > 100) {
        document.querySelector(".desktop-navbar").classList.add("scrolled");
      } else {
        document.querySelector(".desktop-navbar").classList.remove("scrolled");
      }
    }
  });

  // Dropdown menük

  let navItems = document.querySelectorAll(".nav-item");

  navItems.forEach(function (item) {
    let dropdown = item.parentElement.querySelector(".navbar-dropdown");

    if (dropdown) {
      item.addEventListener("click", function () {
        if (
          item.parentElement
            .querySelector(".navbar-dropdown")
            .classList.contains("active")
        ) {
          dropdown.classList.remove("active");
          item.classList.remove("active");

          if (window.innerWidth > 1280) {
            dropdown.style.maxHeight = 0;
          }
        } else {
          if (window.innerWidth > 1280) {
            dropdown.style.maxHeight = dropdown.scrollHeight + "px";
          }

          document.querySelectorAll(".desktop-modal").forEach(function (modal) {
            if (modal.classList.contains("active")) {
              modal.classList.remove("active");
              setTimeout(function () {
                modal.style.display = "none";
              }, 400);
            }
          });

          document
            .querySelectorAll(".navbar-dropdown")
            .forEach(function (item) {
              if (item.classList.contains("active") && item != dropdown) {
                item.style.zIndex = "0";
                if (window.innerWidth > 1280) {
                  item.style.maxHeight = "0px";
                }
                setTimeout(function () {
                  item.classList.remove("active");
                }, 400);
              }
            });

          dropdown.classList.add("active");

          document.querySelectorAll(".nav-item").forEach(function (navitem) {
            navitem.classList.remove("active");
          });

          item.classList.add("active");
        }
      });

      // Bezárás a dropdown mellé kattintva

      window.addEventListener("click", function (e) {
        if (!item.contains(e.target) && !dropdown.contains(e.target)) {
          dropdown.classList.remove("active");
          item.classList.remove("active");
          if (window.innerWidth > 1280) {
            dropdown.style.maxHeight = 0;
          }
        }
      });
    }
  });

  // Kis lenyílók

  let dropdowns = document.querySelectorAll(".desktop-navbar .buttons > .item");

  dropdowns.forEach(function (dropdown) {
    dropdown.querySelector("button").addEventListener("click", function () {
      if (
        dropdown.querySelector(".desktop-modal").classList.contains("active")
      ) {
        dropdown.querySelector(".desktop-modal").classList.remove("active");
        $(".overlay").removeClass("active");
        setTimeout(function () {
          dropdown.querySelector(".desktop-modal").style.display = "none";
          $(".overlay").css("display", "none");
        }, 400);
      } else {
        document.querySelectorAll(".desktop-modal").forEach(function (modal) {
          if (modal.classList.contains("active")) {
            modal.classList.remove("active");
            setTimeout(function () {
              modal.style.display = "none";
            }, 400);
          }
        });

        $(".open-sidebar").removeClass("closed");
        $(".sidebar").removeClass("active");

        if (isMobile) {
          $(".navbar-dropdown").each(function () {
            $(this).removeClass("active");
          });
        }

        document.querySelectorAll(".nav-item").forEach(function (navitem) {
          navitem.classList.remove("active");
        });

        document.querySelectorAll(".navbar-dropdown").forEach(function (item) {
          if (item.classList.contains("active") && item != dropdown) {
            item.style.zIndex = "0";
            item.style.maxHeight = "0px";
            setTimeout(function () {
              item.classList.remove("active");
            }, 400);
          }
        });

        dropdown.querySelector(".desktop-modal").style.display = "block";
        $(".overlay").css("display", "block");
        setTimeout(function () {
          dropdown.querySelector(".desktop-modal").classList.add("active");
          $(".overlay").addClass("active");
        }, 20);
      }
    });

    dropdown.querySelector(".cancel").addEventListener("click", function () {
      dropdown.querySelector(".desktop-modal").classList.remove("active");
      $(".overlay").removeClass("active");
      setTimeout(function () {
        dropdown.querySelector(".desktop-modal").style.display = "none";
        $(".overlay").css("display", "none");
      }, 400);
    });
  });

  // Mobile dropdown vissza

  document
    .querySelectorAll(".navbar-dropdown .arrow")
    .forEach(function (arrow) {
      arrow.addEventListener("click", function () {
        arrow.parentElement.classList.remove("active");
      });
    });

  // Mobile dropdown bezárás

  document
    .querySelectorAll(".navbar-dropdown .cancel")
    .forEach(function (cancel) {
      cancel.addEventListener("click", function () {
        cancel.parentElement.classList.remove("active");
      });
    });

  // Sidebar linkre kattintás után tűnjön el

  document.querySelectorAll(".sidebar a").forEach(function (link) {
    link.addEventListener("click", function () {
      let href = link.getAttribute("href");
      if (href.includes("#")) {
        $(".sidebar").removeClass("active");
        $(".overlay").removeClass("active");
        $(".open-sidebar").removeClass("closed");
        $("body").css("overflow", "auto");
        $("body").css("overflow-x", "hidden");
      }
    });
  });

  $(".overlay").on("click", function () {
    document
      .querySelectorAll(".navbar-dropdown, .lang-dropdown")
      .forEach(function (item) {
        if (item.classList.contains("active")) {
          item.style.zIndex = "0";
          item.style.maxHeight = "0px";
          setTimeout(function () {
            item.classList.remove("active");
          }, 400);
        }
      });
    $(".desktop-modal").removeClass("active");
    $(".nav-item").removeClass("active");
    $(".offer-modal").removeClass("active");
    $(".overlay").removeClass("active");
    if (window.scrollY <= 100) {
      document.querySelector(".desktop-navbar").classList.remove("active");
    }
    setTimeout(function () {
      $(".desktop-modal").css("display", "none");
      $(".offer-modal").css("display", "none");
      $(".overlay").css("display", "none");
      $(".overlay").css("z-index", "997");
    }, 600);
  });

  $(".open-sidebar").on("click", function () {
    if ($(".sidebar").hasClass("active")) {
      $(".sidebar").removeClass("active");
      $(".overlay").removeClass("active");

      if (window.innerWidth <= 1079) {
        $("body").css("overflow", "auto");
        $("body").css("overflow-x", "hidden");
      }

      setTimeout(function () {
        document.querySelector(".overlay").style.display = "none";
      }, 400);

      if (window.scrollY <= 100 && !isNoHeader) {
        document.querySelector(".desktop-navbar").classList.remove("scrolled");
      }
    } else {
      $(".sidebar").addClass("active");
      document.querySelector(".overlay").style.display = "block";

      if (window.innerWidth <= 1079) {
        $("body").css("overflow", "hidden");
      }

      if (window.scrollY <= 100) {
        document.querySelector(".desktop-navbar").classList.add("scrolled");
      }

      setTimeout(function () {
        $(".overlay").addClass("active");
      }, 20);

      document.querySelectorAll(".desktop-modal").forEach(function (modal) {
        if (modal.classList.contains("active")) {
          modal.classList.remove("active");
          setTimeout(function () {
            modal.style.display = "none";
          }, 400);
        }
      });
    }

    $(".navbar-dropdown").each(function () {
      $(this).removeClass("active");
    });

    $(".open-sidebar").toggleClass("closed");
  });

  // Collapse-ok

  let collapses = document.querySelectorAll(".collapse-item");

  collapses.forEach(function (collapse) {
    let collapseContent = collapse.querySelector(".content");

    collapse.querySelector(".header").addEventListener("click", function () {
      if (collapseContent.style.maxHeight) {
        collapseContent.style.maxHeight = null;
        collapse.classList.remove("active");
      } else {
        collapses.forEach(function (collapse) {
          collapse.querySelector(".content").style.maxHeight = null;
          collapse.classList.remove("active");
        });

        collapseContent.style.maxHeight = collapseContent.scrollHeight + "px";
        collapse.classList.add("active");
      }

      setTimeout(function () {
        ScrollTrigger.refresh();
      }, 600);
    });
  });

  // H1 font-size csökkentése 40 karakter felett

  const articleH1 = document.querySelector(".article-hero h1");

  if (articleH1) {
    if (document.querySelector(".article-hero h1").innerText.length > 40) {
      document.querySelector(".article-hero h1").style.fontSize = isMobile
        ? "1.375rem"
        : "3.5rem";
    }
  }

  // Steps vonalak magasságának beállítása

  document.querySelectorAll(".steps").forEach(function (steps) {
    let stepItems = steps.querySelectorAll(".item");

    stepItems.forEach(function (item, index) {
      if (index < stepItems.length - 1) {
        let nextItem = stepItems[index + 1];
        let line = item.querySelector(".line");

        let height = item.offsetHeight / 2 + nextItem.offsetHeight / 2 + 28;
        line.style.height = height + "px";
      }
    });
  });

  // Naptár config: a napok bekerülnek a calendar-days div-be, napra kattintáskor kiválasztott dátum a selected-dates hidden inputba kerül

  const calendarDays = document.getElementById("calendar-days");

  if (calendarDays) {
    const monthYear = document.getElementById("month-year");
    const selectedDatesInput = document.getElementById("selected-dates");
    const prevMonthBtn = document.getElementById("prev-month");
    const nextMonthBtn = document.getElementById("next-month");
    let selectedDates = new Set();

    let currentDate = new Date();
    let today = new Date();

    function formatDate(date) {
      return date.toISOString().split("T")[0];
    }

    function isMonthBeforeCurrent(date) {
      const currentMonth = today.getFullYear() * 12 + today.getMonth();
      const checkMonth = date.getFullYear() * 12 + date.getMonth();
      return checkMonth < currentMonth;
    }

    function renderCalendar(date) {
      calendarDays.innerHTML = "";
      const year = date.getFullYear();
      const month = date.getMonth();

      const firstDay = new Date(year, month, 1);
      const startDay = firstDay.getDay() || 7; // Hétfő = 1, Vasárnap = 7

      const daysInMonth = new Date(year, month + 1, 0).getDate();

      monthYear.textContent = date.toLocaleString("en-EN", {
        month: "long",
        year: "numeric",
      });

      // Napok nevei
      ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].forEach((d) => {
        const el = document.createElement("div");
        el.className = "weekday";
        el.textContent = d;
        calendarDays.appendChild(el);
      });

      // Üres napok az első nap előtt
      for (let i = 1; i < startDay; i++) {
        const empty = document.createElement("div");
        calendarDays.appendChild(empty);
      }

      for (let day = 1; day <= daysInMonth; day++) {
        const cell = document.createElement("div");
        cell.className = "day";
        cell.innerHTML = `<span>${day}</span>`;

        const thisDate = new Date(year, month, day);
        const iso = formatDate(thisDate);

        // Disable dates from months before current month or days before today
        const isBeforeToday =
          thisDate <
          new Date(today.getFullYear(), today.getMonth(), today.getDate());

        if (isMonthBeforeCurrent(thisDate) || isBeforeToday) {
          cell.classList.add("disabled");
        } else {
          if (selectedDates.has(iso)) {
            cell.classList.add("selected");
          }

          cell.addEventListener("click", () => {
            if (selectedDates.has(iso)) {
              selectedDates.delete(iso);
              cell.classList.remove("selected");
            } else {
              selectedDates.add(iso);
              cell.classList.add("selected");
            }
            updateHiddenInput();
          });
        }

        calendarDays.appendChild(cell);
      }
    }

    function updateHiddenInput() {
      selectedDatesInput.value = Array.from(selectedDates).sort().join(",");
    }

    prevMonthBtn.addEventListener("click", () => {
      // Prevent going to months before current month
      const prevMonth = new Date(
        currentDate.getFullYear(),
        currentDate.getMonth() - 1,
        1
      );
      if (!isMonthBeforeCurrent(prevMonth)) {
        changeMonth(-1);
      }
    });

    nextMonthBtn.addEventListener("click", () => {
      changeMonth(1);
    });

    function changeMonth(offset) {
      const newDate = new Date(
        currentDate.getFullYear(),
        currentDate.getMonth() + offset,
        1
      );
      // Prevent going to months before current month
      if (offset < 0 && isMonthBeforeCurrent(newDate)) {
        return;
      }
      currentDate.setMonth(currentDate.getMonth() + offset);
      renderCalendar(currentDate);
    }

    renderCalendar(currentDate);
  }
});

// Accordion functionality
document.addEventListener("DOMContentLoaded", function () {
  const accordionTriggers = document.querySelectorAll(".accordion-trigger");

  accordionTriggers.forEach((trigger) => {
    trigger.addEventListener("click", function () {
      const targetId = this.getAttribute("data-target");
      const content = document.getElementById(targetId);
      const icon = this.querySelector(".accordion-icon");

      // Toggle content visibility
      if (content.style.display === "none" || content.style.display === "") {
        content.style.display = "block";
        icon.textContent = "−";
        icon.style.transform = "rotate(0deg)";
      } else {
        content.style.display = "none";
        icon.textContent = "+";
        icon.style.transform = "rotate(0deg)";
      }
    });
  });
});

